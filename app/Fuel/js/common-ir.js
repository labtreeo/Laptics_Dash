(function () {
    angular.module("ir.filters", []).filter("timeFormat", (function () {
        return function (time, precise = 3, showMins = !1) {
            var h, m, precisePow, res, s, sign;
            return sign = time >= 0, time = Math.abs(time), precise > 0 ? (precisePow = [0, 10, 100, 1e3][precise], time = 3 === precise ? Math.floor(time * precisePow) / precisePow : Math.round(time * precisePow) / precisePow) : time = Math.round(time), m = (time / 60 | 0) % 60, s = time % 60, res = "", (h = time / 3600 | 0) && (res += `${h}:`, m < 10 && (m = `0${m}`)), m || showMins ? (res += `${m}:`, res += s < 10 ? `0${s.toFixed(precise)}` : s.toFixed(precise)) : res += s.toFixed(precise), sign || (res = `-${res}`), res
        }
    })).filter("sessionTimeFormat", (function () {
        return function (time) {
            var h, m, res;
            return res = "", (h = time / 3600 | 0) && (res += `${h}h`), (m = (time / 60 | 0) % 60) && (res += h && m < 10 ? `0${m}m` : `${m}m`), res
        }
    })).filter("numberFormat", (function () {
        return function (value, min = 100, startFraction = 2, useCeil = !0) {
            var a, b, i, j, ref, roundFunc;
            for (roundFunc = useCeil ? Math.ceil : Math.floor, i = j = ref = startFraction; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
                if (!i) return roundFunc(value);
                if (a = min * Math.pow(10, startFraction - i) - Math.pow(.1, i), b = Math.pow(10, i), value <= a) return (roundFunc(value * b) / b).toFixed(i)
            }
        }
    }))
}).call(this);
(function () {
    var indexOf = [].indexOf;
    angular.module("ir.real-positions", ["ir.service", "ir.session-time-lap"]).config((function (iRServiceProvider) {
        return iRServiceProvider.addOptions({
            requestParams: ["CarIdxLap", "CarIdxLapDistPct", "CarIdxTrackSurface", "SessionNum", "SessionTime"],
            requestParamsOnce: ["WeekendInfo"]
        })
    })).service("RealPositions", (function ($rootScope, iRService, SessionTimeLapService) {
        var data, ir, overtakeDistanceThreshold;
        return ir = $rootScope.ir, overtakeDistanceThreshold = null, data = {
            positions: [],
            pByCarIdx: {},
            leaderFinished: !1
        }, $rootScope.$watch("ir.connected", (function (n, o) {
            if (n) return data.positions = [], data.pByCarIdx = {}, data.leaderFinished = !1, overtakeDistanceThreshold = null
        })), $rootScope.$watch("ir.DriverInfo", (function () {
            var base, carIdx, d, i, len, p, ref, results;
            if (null != ir.DriverInfo) {
                for (results = [], i = 0, len = (ref = ir.DriverInfo.Drivers).length; i < len; i++) -1 !== (d = ref[i]).UserID && (d.IsSpectator || (carIdx = d.CarIdx, p = null != (base = data.pByCarIdx)[carIdx] ? base[carIdx] : base[carIdx] = data.pByCarIdx[carIdx] || {carIdx: carIdx}, indexOf.call(data.positions, p) < 0 ? results.push(data.positions.push(p)) : results.push(void 0)));
                return results
            }
        })), $rootScope.$watch("ir.WeekendInfo", (function () {
            if (null != ir.WeekendInfo) return overtakeDistanceThreshold = .006 / parseFloat(ir.WeekendInfo.TrackLength)
        })), $rootScope.$watch("ir.SessionNum", (function () {
            var i, k, len, p, ref, ref1, results;
            if (null != (ref = ir.WeekendInfo) ? ref.HeatRacing : void 0) {
                for (data.leaderFinished = !1, results = [], i = 0, len = (ref1 = data.positions).length; i < len; i++) p = ref1[i], results.push(function () {
                    var results1;
                    for (k in results1 = [], p) "carIdx" !== k && results1.push(delete p[k]);
                    return results1
                }());
                return results
            }
        })), $rootScope.$watch("ir.CarIdxLap", (function () {
            var carIdx, dist, i, idx, index, j, l, lap, len, len1, len2, p, pi, positions, ref, ref1, ref2, ref3;
            if (SessionTimeLapService.isRaceStartCoolDownEnds) {
                if (null != ir.CarIdxLap && null != ir.CarIdxLapDistPct && null != ir.CarIdxTrackSurface) {
                    for (positions = data.positions, carIdx = j = 0, len1 = (ref2 = ir.CarIdxLap).length; j < len1; carIdx = ++j) lap = ref2[carIdx], null != (p = data.pByCarIdx[carIdx]) && (null != (pi = null != (ref3 = ir.PositionsByCarIdx[ir.SessionNum]) ? ref3[carIdx] : void 0) ? (null == p.pi && indexOf.call(positions, p) < 0 && positions.push(p), p.pos = pi.Position - 1, null == p.position && (p.position = p.pos), -1 !== p.trackSurface && (p.lastTrackSurface = p.trackSurface), p.trackSurface = ir.CarIdxTrackSurface[carIdx], !p.fin2 && SessionTimeLapService.isFinish && null != p.pi && pi.LapsComplete > p.pi.LapsComplete && (p.fin2 = !0), dist = ir.CarIdxLapDistPct[carIdx], p.startFromPit && pi.LapsComplete < 1 ? p.dist = 1 : -1 === lap || -1 === dist || null != p.lastTrackSurface && 2 !== p.lastTrackSurface && 1 === p.trackSurface ? (null == p.notOnTrackSince && (p.notOnTrackSince = ir.SessionTime), null == p.dist && 1 === lap && null != dist && (p.dist = lap + dist)) : 1 === p.trackSurface || (delete p.notOnTrackSince, (dist = lap + dist) < p.dist ? dist % 1 < .1 && p.dist % 1 > .9 ? dist += 1 : dist = p.dist : dist - p.dist >= 1 && (dist = lap), !p.fin && SessionTimeLapService.isFinish && p.dist % 1 > .5 && dist % 1 < .5 && (!data.leaderFinished && positions.indexOf(p) < 5 && (data.leaderFinished = !0), data.leaderFinished && (p.fin = !0)), p.dist = dist), p.pi = pi) : -1 !== (index = positions.indexOf(p)) && positions.splice(index, 1));
                    for (positions.sort((function (a, b) {
                        return a.position - b.position
                    })), positions.sort((function (a, b) {
                        return a.fin2 || b.fin2 ? a.pos - b.pos : a.fin || b.fin || null != a.notOnTrackSince && ir.SessionTime - a.notOnTrackSince < 3 || null != b.notOnTrackSince && ir.SessionTime - b.notOnTrackSince < 3 ? a.position - b.position : null == a.dist || null == b.dist ? a.pos - b.pos : a.dist + overtakeDistanceThreshold < b.dist ? 1 : a.dist > b.dist + overtakeDistanceThreshold ? -1 : a.position - b.position
                    })), idx = l = 0, len2 = positions.length; l < len2; idx = ++l) (p = positions[idx]).prevPosition = p.position, p.position = idx;
                    return $rootScope.$broadcast("realPositions:updated")
                }
            } else if (SessionTimeLapService.isRaceStarted) for (i = 0, len = (ref = data.positions).length; i < len; i++) (p = ref[i]).startFromPit || 1 !== (ref1 = ir.CarIdxTrackSurface[p.carIdx]) && 2 !== ref1 || (p.startFromPit = !0)
        })), data
    }))
}).call(this);
(function () {
    var indexOf = [].indexOf;
    angular.module("ir.relatives", ["ir.service", "ir.session-time-lap"]).config((function (iRServiceProvider) {
        return iRServiceProvider.addOptions({
            requestParams: ["CarIdxLap", "CarIdxLapDistPct", "CarIdxOnPitRoad", "SessionInfo", "SessionNum", "SessionState", "SessionTime"],
            requestParamsOnce: ["DriverInfo", "WeekendInfo"]
        })
    })).service("Relatives", (function ($rootScope, iRService, SessionTimeLapService) {
        var bestLapByCarClass, bestLapByCarClassConfirmation, data, dataEmpty, db, emptyRecordData, estLapTime,
            getLapRecordingStore, getTimeByDist, getTimeDiff, ir, isRaceWithJokerLaps, lapRecording, lapRecordingPrev,
            request, setLapRecordingStore;
        return ir = $rootScope.ir, isRaceWithJokerLaps = !1, estLapTime = null, bestLapByCarClass = {}, bestLapByCarClassConfirmation = {}, lapRecording = [], lapRecordingPrev = [], emptyRecordData = {
            items: [],
            isLapStarts: !1,
            isWaitingToEnd: !1,
            isLapEnds: !1,
            jokerLaps: null,
            lapTime: null,
            lap: null
        }, data = {
            getTimeDiff: function () {
                return getTimeDiff(...arguments)
            }
        }, dataEmpty = angular.copy(data), $rootScope.$watch("ir.connected", (function (n, o) {
            var waitingDriverInfo;
            if (n) return angular.extend(data, dataEmpty), bestLapByCarClass = {}, bestLapByCarClassConfirmation = {}, lapRecording = [], lapRecordingPrev = [], estLapTime = null, isRaceWithJokerLaps = !1, waitingDriverInfo = $rootScope.$watchGroup(["ir.DriverInfo", "ir.WeekendInfo"], (function (n, o) {
                var d, i, id, j, k, lapRecordingIDs, lapRecordingRequests, len1, len2, ref, results1;
                if (null != n[0] && null != n[1]) {
                    for (waitingDriverInfo(), isRaceWithJokerLaps = ir.WeekendInfo.WeekendOptions.NumJokerLaps > 0, estLapTime = ir.DriverInfo.DriverCarEstLapTime, lapRecordingRequests = [], lapRecordingIDs = [], j = 0, len1 = (ref = ir.DriverInfo.Drivers).length; j < len1; j++) d = ref[j], id = `trackId:${ir.WeekendInfo.TrackID} carId:${d.CarID}`, indexOf.call(lapRecordingIDs, id) < 0 && (lapRecordingIDs.push(id), lapRecordingRequests.push({
                        id: id,
                        d: d
                    }));
                    for (results1 = [], k = 0, len2 = lapRecordingRequests.length; k < len2; k++) i = lapRecordingRequests[k], results1.push(getLapRecordingStore(i.id, (function (data) {
                        var best;
                        if (null != data) return !(best = bestLapByCarClass[i.d.CarClassID]) || data.lapTime < best.lapTime ? bestLapByCarClass[i.d.CarClassID] = data : void 0
                    })));
                    return results1
                }
            }))
        })), $rootScope.$watch("ir.CarIdxLapDistPct", (function () {
            var carClass, carIdx, diff, diffDist, dist, first, i, isLegitLap, itemsLength, j, k, l, last, last2, len1,
                len2, len3, meters120, newRecordData, p, prevDist, prevRecord, prevRecordConfirm, recordData, ref, ref1,
                ref2, ref3, ref4, results, results1, timeDist;
            if (null != ir.CarIdxLapDistPct) {
                for (isRaceWithJokerLaps && (results = null != (ref = ir.SessionInfo) ? ref.Sessions[ir.SessionNum].ResultsPositions : void 0), results1 = [], carIdx = j = 0, len1 = (ref1 = ir.CarIdxLapDistPct).length; j < len1; carIdx = ++j) if (-1 !== (dist = ref1[carIdx])) if (ir.CarIdxOnPitRoad[carIdx] || 4 !== (ref2 = ir.SessionState) && 5 !== ref2 || SessionTimeLapService.isRace && !SessionTimeLapService.isRaceStartCoolDownEnds) lapRecording[carIdx] = null; else {
                    if (null == (recordData = null != lapRecording[carIdx] ? lapRecording[carIdx] : lapRecording[carIdx] = angular.copy(emptyRecordData)).lap && (recordData.carIdx = carIdx, recordData.lap = ir.CarIdxLap[carIdx]), null != recordData.prevItem && dist < (prevDist = recordData.prevItem.dist)) {
                        if ((diff = prevDist - dist) < .01) continue;
                        if (diff < .5) {
                            delete lapRecording[carIdx];
                            continue
                        }
                    }
                    if (isRaceWithJokerLaps && null == recordData.jokerLaps && results) for (k = 0, len2 = results.length; k < len2; k++) if ((p = results[k]).CarIdx === recordData.carIdx) {
                        recordData.lap - 1 === p.LapsComplete && (recordData.jokerLaps = p.JokerLapsComplete);
                        break
                    }
                    if (recordData.items.push(recordData.prevItem = {
                        dist: dist,
                        time: ir.SessionTime
                    }), (itemsLength = recordData.items.length) >= 3) if (first = recordData.items[0], last = recordData.items[itemsLength - 1], last2 = recordData.items[itemsLength - 2], recordData.isLapStarts && (!recordData.isWaitingToEnd && last2.dist > .9 && last.dist < .1 && (recordData.isWaitingToEnd = !0), recordData.isWaitingToEnd && !recordData.isLapEnds && last.dist >= first.dist && (recordData.isLapEnds = !0)), !recordData.isLapStarts && last2.dist > .9 && last.dist < .1 && (lapRecordingPrev[carIdx] = angular.copy(recordData), lapRecordingPrev[carIdx].items.pop(), recordData.isLapStarts = !0, recordData.items = [last], !SessionTimeLapService.isRace || SessionTimeLapService.isRaceStartCoolDownEnds ? recordData.lap = ir.CarIdxLap[carIdx] : recordData.lap = 1), null == recordData.lapTime && recordData.isLapEnds && .1 > (ref3 = last2.dist) && ref3 >= 0) if (diffDist = last.dist - last2.dist, timeDist = last.time - last2.time, recordData.lapTime = last2.time - (last2.dist - first.dist) * (timeDist / diffDist) - first.time, (newRecordData = lapRecording[carIdx] = angular.copy(emptyRecordData)).items = recordData.items.splice(itemsLength - 2, 2), newRecordData.isLapStarts = !0, newRecordData.carIdx = carIdx, newRecordData.lap = recordData.lap + 1, carClass = ir.DriversByCarIdx[carIdx].CarClassID, lapRecordingPrev[carIdx] = recordData, prevRecord = bestLapByCarClass[carClass], prevRecordConfirm = bestLapByCarClassConfirmation[carClass], (!prevRecord || null == prevRecord.carIdx || prevRecord.lapTime > 0 && recordData.lapTime < prevRecord.lapTime) && (!prevRecordConfirm || prevRecordConfirm.lapTime > 0 && recordData.lapTime < prevRecordConfirm.lapTime)) {
                        for (meters120 = .12 / parseFloat(ir.WeekendInfo.TrackLength), p = null, isLegitLap = !0, l = 0, len3 = (ref4 = recordData.items).length; l < len3; l++) {
                            if (i = ref4[l], p && i.dist - p.dist > meters120) {
                                isLegitLap = !1;
                                break
                            }
                            p = i
                        }
                        1 - i.dist > meters120 && (isLegitLap = !1), isLegitLap ? results1.push(bestLapByCarClassConfirmation[carClass] = recordData) : results1.push(void 0)
                    } else results1.push(void 0); else results1.push(void 0); else -1 !== ir.CarIdxLap[carIdx] && recordData.lap !== ir.CarIdxLap[carIdx] ? results1.push(delete lapRecording[carIdx]) : results1.push(void 0)
                }
                return results1
            }
        })), $rootScope.$watch("ir.SessionInfo", (function () {
            var carClass, carId, p, results, results1;
            if (null != ir.SessionInfo || ir.SessionNum >= 0) {
                for (carClass in results1 = [], bestLapByCarClassConfirmation) data = bestLapByCarClassConfirmation[carClass], carClass = Number(carClass), (results = ir.SessionInfo.Sessions[ir.SessionNum].ResultsPositions) ? results1.push(function () {
                    var j, len1, results2;
                    for (results2 = [], j = 0, len1 = results.length; j < len1; j++) {
                        if ((p = results[j]).CarIdx === data.carIdx && p.LapsComplete === data.lap) {
                            if (isRaceWithJokerLaps && p.JokerLapsComplete > data.jokerLaps) {
                                delete bestLapByCarClassConfirmation[carClass];
                                break
                            }
                            Math.abs(p.LastTime - data.lapTime) <= .1 && (bestLapByCarClass[carClass] = data, carId = ir.DriversByCarIdx[data.carIdx].CarID, setLapRecordingStore(`trackId:${ir.WeekendInfo.TrackID} carId:${carId}`, data)), delete bestLapByCarClassConfirmation[carClass];
                            break
                        }
                        results2.push(void 0)
                    }
                    return results2
                }()) : results1.push(void 0);
                return results1
            }
        })), getTimeDiff = function (a, b, carClass) {
            var apct, atime, bpct, btime, dist, recordData, time;
            return a.dist >= 0 && b.dist >= 0 ? (apct = a.dist % 1, bpct = b.dist % 1, null == carClass && (carClass = ir.DriversByCarIdx[a.carIdx].CarClassID), null != (recordData = bestLapByCarClass[carClass]) ? (atime = getTimeByDist(recordData, apct), btime = getTimeByDist(recordData, bpct), atime && btime && (time = btime - atime, bpct < apct && (time += recordData.lapTime))) : null == time && estLapTime && ((dist = bpct - apct) < 0 && (dist += 1), time = dist * estLapTime), time) : null
        }, getTimeByDist = function (recordData, dist) {
            var diffDist, i0, i1, im, im1, imax, imid, imin, items, len, max, min, timeDist;
            if (!recordData) return null;
            if (imax = (len = (items = recordData.items).length) - 1, dist < items[imin = 0].dist) return len > 5 ? (i0 = items[imin], i1 = items[imin + 1], i0.time - (i1.time - i0.time) / (i1.dist - i0.dist) * (i0.dist - dist)) : null;
            if (dist > items[imax].dist) return len > 5 ? (im = items[imax], im1 = items[imax - 1], im.time + (im.time - im1.time) / (im.dist - im1.dist) * (dist - im.dist)) : null;
            for (; imax - imin > 1;) dist > items[imid = imin + imax >> 1].dist ? imin = imid : imax = imid;
            for (; imin > 0 && items[imin].dist > dist;) imin--;
            for (; imax < len - 1 && items[imax].dist < dist;) imax++;
            return min = items[imin], max = items[imax], min.dist <= dist && dist <= max.dist ? (diffDist = max.dist - min.dist, timeDist = max.time - min.time, min.time + (dist - min.dist) / diffDist * timeDist) : void 0
        }, db = null, (request = indexedDB.open("BestLapRecordData")).onerror = function (event) {
            return console.error(event)
        }, request.onsuccess = function (event) {
            return db = event.target.result
        }, request.onupgradeneeded = function (event) {
            return (db = event.target.result).createObjectStore("lapRecording", {keyPath: "id"})
        }, getLapRecordingStore = function (id, callback) {
            var os;
            if (null != db) return os = db.transaction("lapRecording").objectStore("lapRecording"), (request = os.get(id)).onsuccess = function (event) {
                var ref;
                return callback(null != (ref = event.target.result) ? ref.data : void 0)
            };
            setTimeout(getLapRecordingStore, 100, id, callback)
        }, setLapRecordingStore = function (id, data) {
            var os;
            return os = db.transaction("lapRecording", "readwrite").objectStore("lapRecording"), request = os.put({
                id: id,
                data: {lapTime: data.lapTime, items: data.items}
            })
        }, data
    }))
}).call(this);
(function () {
    var indexOf = [].indexOf;
    angular.module("ir.service", []).provider("iRService", (function () {
        this.options = {
            requestParams: ["DriverInfo", "QualifyResultsInfo", "SessionInfo"],
            requestParamsOnce: [],
            fps: 10
        }, this.addOptions = function (data) {
            var k, optV, p, results1, v;
            for (k in results1 = [], data) v = data[k], null != (optV = this.options[k]) && angular.isArray(optV) && angular.isArray(v) ? results1.push(function () {
                var j, len, results2;
                for (results2 = [], j = 0, len = v.length; j < len; j++) p = v[j], indexOf.call(optV, p) < 0 && results2.push(optV.push(p));
                return results2
            }()) : results1.push(this.options[k] = v);
            return results1
        }, this.serviceOnly = function () {
            return this.options = {fps: 1}
        }, this.$get = function ($rootScope, config) {
            var ir, ref, ref1, updateDriversByCarIdx, updatePositionsByCarIdx, updateQualifyResultsByCarIdx;
            return (ir = new IRacing(this.options.requestParams, this.options.requestParamsOnce, null != (ref = config.fps) ? ref : this.options.fps, null != (ref1 = config.server) ? ref1 : this.options.server, this.options.readIbt, config.record, config.zipLibPath)).onWSConnect = function () {
                return $rootScope.$broadcast("iRServiceWebsocketConnected")
            }, ir.onWSDisconnect = function () {
                return $rootScope.$broadcast("iRServiceWebsocketDisconnected")
            }, ir.onConnect = function (update = !0) {
                if (ir.data.connected = !0, update) return $rootScope.$apply()
            }, ir.onDisconnect = function (update = !0) {
                if (ir.data.connected = !1, update) return $rootScope.$apply()
            }, ir.onUpdate = function (keys, update = !0) {
                if (indexOf.call(keys, "DriverInfo") >= 0 && updateDriversByCarIdx(), indexOf.call(keys, "SessionInfo") >= 0 && (updatePositionsByCarIdx(), updateQualifyResultsByCarIdx()), indexOf.call(keys, "QualifyResultsInfo") >= 0 && updateQualifyResultsByCarIdx(), update) return $rootScope.$apply()
            }, ir.onBroadcast = function (data) {
                return $rootScope.$broadcast("broadcastMessage", data)
            }, updateDriversByCarIdx = function () {
                var base, driver, j, len, ref2, results1;
                for (null == (base = ir.data).DriversByCarIdx && (base.DriversByCarIdx = {}), results1 = [], j = 0, len = (ref2 = ir.data.DriverInfo.Drivers).length; j < len; j++) driver = ref2[j], results1.push(ir.data.DriversByCarIdx[driver.CarIdx] = driver);
                return results1
            }, updatePositionsByCarIdx = function () {
                var base, i, j, len, position, ref2, results1, session;
                for (null == (base = ir.data).PositionsByCarIdx && (base.PositionsByCarIdx = []), ref2 = ir.data.SessionInfo.Sessions, results1 = [], i = j = 0, len = ref2.length; j < len; i = ++j) {
                    for (session = ref2[i]; i >= ir.data.PositionsByCarIdx.length;) ir.data.PositionsByCarIdx.push({});
                    session.ResultsPositions ? results1.push(function () {
                        var l, len1, ref3, results2;
                        for (results2 = [], l = 0, len1 = (ref3 = session.ResultsPositions).length; l < len1; l++) position = ref3[l], results2.push(ir.data.PositionsByCarIdx[i][position.CarIdx] = position);
                        return results2
                    }()) : results1.push(void 0)
                }
                return results1
            }, updateQualifyResultsByCarIdx = function () {
                var base, j, len, position, ref2, ref3, results, results1;
                for (null == (base = ir.data).QualifyResultsByCarIdx && (base.QualifyResultsByCarIdx = {}), results1 = [], j = 0, len = (results = (null != (ref2 = ir.data.QualifyResultsInfo) ? ref2.Results : void 0) || (null != (ref3 = ir.data.SessionInfo.Sessions[ir.data.SessionNum]) ? ref3.QualifyPositions : void 0) || []).length; j < len; j++) position = results[j], results1.push(ir.data.QualifyResultsByCarIdx[position.CarIdx] = position);
                return results1
            }, $rootScope.ir = ir.data, ir
        }
    })).provider("iRFastService", (function () {
        this.options = {requestParams: [], requestParamsOnce: [], fps: 30}, this.addOptions = function (data) {
            var k, optV, p, results1, v;
            for (k in results1 = [], data) v = data[k], null != (optV = this.options[k]) && angular.isArray(optV) && angular.isArray(v) ? results1.push(function () {
                var j, len, results2;
                for (results2 = [], j = 0, len = v.length; j < len; j++) p = v[j], indexOf.call(optV, p) < 0 && results2.push(optV.push(p));
                return results2
            }()) : results1.push(this.options[k] = v);
            return results1
        }, this.$get = function ($rootScope, config, iRService) {
            var ir, onUpdateOriginal, ref, ref1;
            if (this.options.requestParams.length || this.options.requestParamsOnce.length) return (ir = new IRacing(this.options.requestParams, this.options.requestParamsOnce, null != (ref = config.fpsFast) ? ref : this.options.fps, null != (ref1 = config.server) ? ref1 : this.options.server)).onConnect = function (update = !0) {
                if (ir.data.connected = !0, update) return $rootScope.$apply()
            }, ir.onDisconnect = function (update = !0) {
                if (ir.data.connected = !1, update) return $rootScope.$apply()
            }, ir.onUpdate = function (keys, update = !0) {
                if (update) return $rootScope.$apply()
            }, config.record && (ir.record = {requestedParamsOnce: []}, onUpdateOriginal = iRService.onUpdate, iRService.onUpdate = (keys, update = !0) => {
                var data, j, k, l, len, len1, ref2, ref3;
                if (null != (data = iRService.record.frames[iRService.record.currentFrame]) ? data.data : void 0) {
                    for (j = 0, len = (ref2 = this.options.requestParams).length; j < len; j++) (k = ref2[j]) in data.data && (ir.data[k] = data.data[k]);
                    for (l = 0, len1 = (ref3 = this.options.requestParamsOnce).length; l < len1; l++) k = ref3[l], indexOf.call(ir.record.requestedParamsOnce, k) < 0 && k in data.data && (ir.data[k] = data.data[k])
                }
                return onUpdateOriginal(keys, update)
            }), $rootScope.irFast = ir.data, ir
        }
    }))
}).call(this);
(function () {
    angular.module("ir.session-time-lap", ["ir.service", "ir.filters"]).config((function (iRServiceProvider) {
        return iRServiceProvider.addOptions({
            requestParams: ["CamCarIdx", "CarIdxLap", "CarIdxLapDistPct", "CarIdxTrackSurface", "SessionFlags", "SessionInfo", "SessionNum", "SessionState", "SessionTime", "SessionTimeRemain"],
            requestParamsOnce: ["DriverInfo", "WeekendInfo"]
        })
    })).service("SessionTimeLapService", (function ($rootScope, $filter, iRService) {
        var avgLapTimes, data, dataEmpty, forceUseSessionTime, getLapsInRaceByCarIdx, ir, lastResultsLapsComplete,
            raceStartsAt, sessionLapWatcher, sessionTimeFormat, timeFormat, updateAvgLapTimes, updateSessionLap,
            updateSessionLaps, updateSessionTime;
        return ir = $rootScope.ir, raceStartsAt = null, avgLapTimes = null, sessionLapWatcher = null, lastResultsLapsComplete = null, null, forceUseSessionTime = !1, data = {
            isRace: !1,
            isRaceStarted: !1,
            isRaceStartCoolDownEnds: !1,
            isFinish: !1,
            isSessionEnds: !1,
            sessionTypeShort: null,
            leaderLap: null,
            currentCarLap: null,
            driverRaceLaps: null,
            leaderRaceLaps: null,
            driverRaceLapsFraction: null,
            sessionLaps: null,
            sessionLapsString: null,
            sessionTime: null,
            sessionTimeString: null,
            sessionTotalTime: null,
            sessionTotalTimeString: null,
            isDriverSpectating: !1
        }, dataEmpty = angular.copy(data), timeFormat = $filter("timeFormat"), sessionTimeFormat = $filter("sessionTimeFormat"), $rootScope.$watch("ir.connected", (function (n, o) {
            if (n) return angular.extend(data, dataEmpty), "function" == typeof sessionLapWatcher && sessionLapWatcher(), raceStartsAt = null, avgLapTimes = new Map, lastResultsLapsComplete = null, null, forceUseSessionTime = !1
        })), $rootScope.$watch("ir.SessionState", (function (n, o) {
            var ref, session;
            if (null != n && !data.isSessionEnds) {
                if (6 !== o || 0 !== n) return null != (session = null != (ref = ir.SessionInfo) ? ref.Sessions[ir.SessionNum] : void 0) && !data.isRaceStarted && n >= 4 && "Race" === session.SessionType && (data.isRaceStarted = !0, o < 4 ? raceStartsAt = ir.SessionTime : data.isRaceStartCoolDownEnds = !0), n > 0 ? 0 < n && n < 4 ? (data.isRaceStarted = !1, data.isRaceStartCoolDownEnds = !1, data.isSessionEnds = !1, data.isFinish = !1, raceStartsAt = null) : data.isFinish = n >= 5 : void 0;
                data.isSessionEnds = !0
            }
        })), $rootScope.$watchGroup(["ir.SessionInfo", "ir.SessionNum"], (function (n, o) {
            var arr, session, type;
            if (!data.isSessionEnds && null != n[0] && null != n[1] && (null == o[0] || n[1] !== o[1]) && (avgLapTimes = new Map, data.leaderLap = null, data.currentCarLap = null, data.driverRaceLaps = null, data.leaderRaceLaps = null, data.sessionLaps = data.sessionLapsString = null, data.sessionTotalTime = data.sessionTotalTimeString = null, null != ir.SessionNum && null != ir.SessionInfo && null != (session = ir.SessionInfo.Sessions[ir.SessionNum]))) return type = session.SessionType, data.isRace = "Race" === type, arr = type.split(" "), data.sessionTypeShort = function () {
                switch (session.SessionSubType) {
                    case"Heat":
                        return "R1";
                    case"Feature":
                        return "R2";
                    default:
                        return arr[arr.length - 1][0]
                }
            }()
        })), $rootScope.$watch("ir.CamCarIdx", (function (n, o) {
            return n, "function" == typeof sessionLapWatcher && sessionLapWatcher(), sessionLapWatcher = $rootScope.$watchGroup(["ir.CarIdxLap", "ir.SessionInfo", "ir.DriverInfo"], updateSessionLap), updateSessionLaps()
        })), updateSessionLap = function () {
            var carClass, carIdx, j, k, l, lap, len, len1, len2, p, passed, prevLeaderLap, ref, ref1, ref2, ref3, ref4,
                ref5, ref6, ref7, ref8, results;
            if (ir.CamCarIdx >= 0 && ir.CarIdxLap && ir.DriverInfo) {
                if (data.isRace) if (ir.SessionState < 4) data.leaderLap = 0; else if (4 === ir.SessionState) if (data.isRaceStartCoolDownEnds) {
                    if (carClass = null != (ref4 = ir.DriversByCarIdx[ir.CamCarIdx]) ? ref4.CarClassID : void 0, prevLeaderLap = data.leaderLap, data.leaderLap = 0, null != carClass) {
                        for (carIdx = k = 0, len1 = (ref5 = ir.CarIdxLap).length; k < len1; carIdx = ++k) -1 !== (lap = ref5[carIdx]) && (null != (ref6 = ir.DriversByCarIdx[carIdx]) ? ref6.CarClassID : void 0) === carClass && (data.leaderLap = Math.max(data.leaderLap, lap));
                        if (null != (results = null != (ref7 = ir.SessionInfo) ? ref7.Sessions[ir.SessionNum].ResultsPositions : void 0)) for (l = 0, len2 = results.length; l < len2; l++) 0 === (p = results[l]).ClassPosition && (null != (ref8 = ir.DriversByCarIdx[p.CarIdx]) ? ref8.CarClassID : void 0) === carClass && (data.leaderLap = Math.max(data.leaderLap, p.LapsComplete + 1))
                    }
                    data.leaderLap || (data.leaderLap = prevLeaderLap)
                } else {
                    if (passed = !0, null != raceStartsAt && ir.SessionTime - raceStartsAt < 5 && (passed = !1), passed) for (carIdx = j = 0, len = (ref = ir.CarIdxLap).length; j < len; carIdx = ++j) if (lap = ref[carIdx], (carIdx !== ir.DriverInfo.PaceCarIdx || 0 !== lap) && -1 !== lap) {
                        if ((null != (ref1 = ir.PositionsByCarIdx[ir.SessionNum]) && null != (ref2 = ref1[carIdx]) ? ref2.LapsComplete : void 0) > 0) break;
                        if (1 !== (ref3 = ir.CarIdxTrackSurface[carIdx]) && 2 !== ref3 && !(1 === lap && ir.CarIdxLapDistPct[carIdx] < .5)) {
                            passed = !1;
                            break
                        }
                    }
                    data.isRaceStartCoolDownEnds = passed, data.leaderLap = 1
                }
                return data.currentCarLap = ir.CarIdxLap[ir.CamCarIdx]
            }
        }, getLapsInRaceByCarIdx = function (carIdx) {
            var avgData, avgLeaderData, avgLeaderSessionLaps, avgSessionLaps, carClass, i, j, k, l, lapsComplete,
                leaderClass, leaderClassLapTime, len, len1, len2, p, raceLaps, raceSessionTime, ref, ref1, ref2, ref3,
                ref4, ref5, results, s, session;
            for (i = j = 0, len = (ref = ir.SessionInfo.Sessions).length; j < len; i = ++j) if ("Race" === (s = ref[i]).SessionType && i >= ir.SessionNum) {
                session = s;
                break
            }
            if (null == session) return [null, null, !1];
            if (carClass = ir.DriversByCarIdx[carIdx].CarClassID, avgData = avgLapTimes.get(carClass), null != (leaderClass = null != (ref1 = ir.DriversByCarIdx[null != (ref2 = session.ResultsPositions) ? ref2[0].CarIdx : void 0]) ? ref1.CarClassID : void 0) && carClass !== leaderClass && (avgLeaderSessionLaps = null != (avgLeaderData = avgLapTimes.get(leaderClass)) ? avgLeaderData.sessionLaps : void 0), lapsComplete = null != avgData ? avgData.lapsComplete : void 0, raceLaps = parseInt(session.SessionLaps) || null, lapsComplete) {
                if (null != avgData ? avgData.sessionLaps : void 0) {
                    if (session.ResultsOfficial) return [lapsComplete, null, !1];
                    if (null == raceLaps || avgData.sessionLaps < raceLaps) return [avgData.sessionLaps, avgLeaderSessionLaps, avgData.sessionLapsFraction]
                }
            } else {
                if (avgSessionLaps = null, (raceSessionTime = parseInt(session.SessionTime)) > 0) {
                    if ((null != (ref3 = ir.WeekendInfo) ? ref3.HeatRacing : void 0) || (results = null != (ref4 = ir.QualifyResultsInfo) ? ref4.Results : void 0), null == results) for (k = 0, len1 = (ref5 = ir.SessionInfo.Sessions).length; k < len1; k++) if (-1 !== (s = ref5[k]).SessionType.search(/qual/i)) {
                        if (s.ResultsPositions) {
                            results = s.ResultsPositions;
                            break
                        }
                    } else -1 === s.SessionType.search(/race/i) && (results = s.ResultsPositions);
                    if (null != results) for (l = 0, len2 = results.length; l < len2; l++) if (0 === (p = results[l]).Position && p.FastestTime > 0 && (leaderClassLapTime = p.FastestTime, ir.DriversByCarIdx[p.CarIdx].CarClassID !== carClass && (avgLeaderSessionLaps = raceSessionTime / leaderClassLapTime)), 0 === p.ClassPosition && p.FastestTime > 0 && ir.DriversByCarIdx[p.CarIdx].CarClassID === carClass) {
                        avgSessionLaps = 0 !== p.Position && leaderClassLapTime > 0 ? Math.ceil(avgLeaderSessionLaps) * leaderClassLapTime / p.FastestTime : raceSessionTime / p.FastestTime;
                        break
                    }
                }
                if (null != avgSessionLaps && null != raceLaps && avgSessionLaps < raceLaps || null != avgSessionLaps && null == raceLaps) return [avgSessionLaps, avgLeaderSessionLaps, !0];
                if (null != raceLaps) return [raceLaps, null, !1]
            }
            return [raceLaps, null, !1]
        }, $rootScope.$watchGroup(["ir.SessionNum", "ir.SessionInfo"], updateSessionLaps = function () {
            var isFraction, leaderSessionLaps, ref, session, sessionLaps;
            if (!data.isSessionEnds) return ir.SessionInfo && ir.SessionNum >= 0 && ir.CamCarIdx >= 0 && null != ir.DriversByCarIdx && ir.CamCarIdx in ir.DriversByCarIdx ? (updateAvgLapTimes(), session = ir.SessionInfo.Sessions[ir.SessionNum], [data.driverRaceLaps, data.leaderRaceLaps, data.driverRaceLapsFraction] = getLapsInRaceByCarIdx(ir.DriverInfo.DriverCarIdx), (sessionLaps = parseInt(session.SessionLaps) || null) && (data.sessionLaps = sessionLaps, data.sessionLapsString = `${data.sessionLaps}`), "Race" === session.SessionType ? ([data.sessionLaps, leaderSessionLaps, isFraction] = getLapsInRaceByCarIdx(ir.CamCarIdx), data.sessionLaps && (data.sessionLapsString = isFraction ? `≈${data.sessionLaps.toFixed(.1 < (ref = data.sessionLaps % 1) && ref < .9 ? 1 : 2)}` : `${data.sessionLaps}`)) : sessionLaps || (data.sessionLaps = null, data.sessionLapsString = null), updateSessionLap()) : (data.driverRaceLaps = null, data.leaderRaceLaps = null, data.sessionLaps = null, void (data.sessionLapsString = null))
        }), $rootScope.$watch("ir.CarIdxLap", (function (n, o) {
            var avgData, carClass, carIdx, history, j, lap, len, offset, ref, results1;
            if (n && o && ir.DriverInfo && data.isRace && data.isRaceStartCoolDownEnds) {
                for (results1 = [], carIdx = j = 0, len = n.length; j < len; carIdx = ++j) lap = n[carIdx], carIdx in ir.DriversByCarIdx && (carClass = ir.DriversByCarIdx[carIdx].CarClassID, (avgData = avgLapTimes.get(carClass)) && (-1 !== lap ? ((history = avgData.historyByCarIdx.get(carIdx)) || avgData.historyByCarIdx.set(carIdx, history = {}), history.lap !== lap && (lap - history.lap == 1 ? (((offset = ir.CarIdxLapDistPct[carIdx] * (null != (ref = avgData.avgLapTime) ? ref : avgData.estLapTime)) < 0 || isNaN(offset)) && (offset = 0), history.sessionTimeRemain = ir.SessionTimeRemain - offset, history.lapsComplete = lap - 1, delete history.lapTime) : delete history.sessionTimeRemain, results1.push(history.lap = lap))) : avgData.historyByCarIdx.delete(carIdx)));
                return results1
            }
        })), updateAvgLapTimes = function () {
            var avgData, avgLeaderData, carClass, classLeader, history, j, k, l, lapTime, leaderClass,
                leaderSessionTimeRemain, len, len1, len2, len3, m, minLapTime, overallLeader, pos, ref, ref1, ref2,
                ref3, ref4, results, session, sessionTimeRemain, t, total, totalTimeCounts, x, y;
            if (null != (session = null != (ref = ir.SessionInfo) ? ref.Sessions[ir.SessionNum] : void 0) && "Race" === session.SessionType && null != (results = session.ResultsPositions)) {
                for (leaderClass = null, j = 0, len = results.length; j < len; j++) if ((pos = results[j]).CarIdx in ir.DriversByCarIdx) {
                    if (carClass = ir.DriversByCarIdx[pos.CarIdx].CarClassID, (avgData = avgLapTimes.get(carClass)) || avgLapTimes.set(carClass, avgData = {
                        lapsComplete: 0,
                        lapTimes: [],
                        avgLapTime: null,
                        estLapTime: null,
                        sessionLaps: null,
                        sessionLapsFraction: !0,
                        sessionTimeRemain: null,
                        sessionTimeRemainLastLapsComplete: null,
                        sessionTimeRemainBackup: null,
                        historyByCarIdx: new Map
                    }), null == avgData.estLapTime && pos.CarIdx in ir.DriversByCarIdx && (avgData.estLapTime = ir.DriversByCarIdx[pos.CarIdx].CarClassEstLapTime), 1 === pos.Position && (leaderClass = ir.DriversByCarIdx[pos.CarIdx].CarClassID), 0 === pos.ClassPosition) {
                        if ("replay" === (null != (ref1 = ir.WeekendInfo) ? ref1.SimMode : void 0) && (avgData.lapsComplete = pos.LapsComplete, avgData.sessionLaps = pos.LapsComplete, avgData.sessionLapsFraction = !1), pos.LapsComplete < 2 || pos.LapsComplete <= avgData.lapsComplete || data.isSessionEnds) continue;
                        avgData.lapsComplete && (avgData.sessionTimeRemainBackup = ir.SessionTimeRemain), avgData.lapsComplete = pos.LapsComplete, delete avgData.sessionTimeRemain
                    }
                    if (4 === ir.SessionState && avgData.sessionLapsFraction && 0 === pos.ClassPosition && !session.ResultsOfficial) {
                        for (pos.LastTime > 0 && !(49152 & ir.SessionFlags) && avgData.lapTimes.push(pos.LastTime); avgData.lapTimes.length > 5;) avgData.lapTimes.shift();
                        for (total = 0, minLapTime = 2 + Math.min(...avgData.lapTimes), totalTimeCounts = 0, k = 0, len1 = (ref2 = avgData.lapTimes).length; k < len1; k++) (t = ref2[k]) < minLapTime && (total += t, totalTimeCounts++);
                        avgData.avgLapTime = total / totalTimeCounts
                    }
                }
                if (!data.isSessionEnds && -1 !== (ref3 = ir.SessionState) && 0 !== ref3 && 5 !== ref3 && 6 !== ref3) {
                    for (overallLeader = null, l = 0, len2 = results.length; l < len2; l++) if (1 === (pos = results[l]).Position) {
                        overallLeader = pos;
                        break
                    }
                    for (x of avgLapTimes) if ([carClass, avgData] = x, null == avgData.sessionTimeRemain || avgData.sessionTimeRemainLastLapsComplete !== avgData.lapsComplete) for (m = 0, len3 = results.length; m < len3; m++) if (pos = results[m], carClass === ir.DriversByCarIdx[pos.CarIdx].CarClassID && (0 === pos.ClassPosition && (classLeader = pos), !(classLeader.LapsComplete < 2) && (history = avgData.historyByCarIdx.get(pos.CarIdx)) && pos.LapsComplete === history.lapsComplete && -1 !== classLeader.Time && -1 !== pos.Time)) {
                        if (classLeader.LapsComplete === history.lapsComplete) {
                            avgData.sessionTimeRemain = history.sessionTimeRemain + (pos.Time - classLeader.Time), avgData.sessionTimeRemainLastLapsComplete = history.lapsComplete;
                            break
                        }
                        if (classLeader.LapsComplete === history.lapsComplete + 1 && -1 !== overallLeader.LastTime && -1 !== classLeader.LastTime) {
                            avgData.sessionTimeRemain = history.sessionTimeRemain + pos.Time - (overallLeader.LastTime + classLeader.Time), avgData.sessionTimeRemainLastLapsComplete = history.lapsComplete;
                            break
                        }
                    }
                    for (y of avgLapTimes) if ([carClass, avgData] = y, null != (sessionTimeRemain = null != avgData.sessionTimeRemain && avgData.lapsComplete <= avgData.sessionTimeRemainLastLapsComplete + 2 ? avgData.sessionTimeRemain : null != avgData.sessionTimeRemainBackup ? avgData.sessionTimeRemainBackup + 3 : void 0) && !isNaN(avgData.avgLapTime) && (lapTime = null != (ref4 = avgData.avgLapTime) ? ref4 : avgData.estLapTime, avgData.sessionLaps = avgData.lapsComplete + 2 + (sessionTimeRemain - 2 * lapTime) / lapTime, carClass !== leaderClass && avgLapTimes.has(leaderClass))) {
                        if (null == (avgLeaderData = avgLapTimes.get(leaderClass)).sessionTimeRemain || isNaN(avgLeaderData.avgLapTime)) continue;
                        leaderSessionTimeRemain = Math.ceil(avgLeaderData.sessionLaps - avgLeaderData.lapsComplete) * avgLeaderData.avgLapTime, leaderSessionTimeRemain -= avgLeaderData.sessionTimeRemain - sessionTimeRemain, leaderSessionTimeRemain = Math.max(1, leaderSessionTimeRemain), avgData.sessionLaps = avgData.lapsComplete + leaderSessionTimeRemain / avgData.avgLapTime
                    }
                }
            }
        }, $rootScope.$watch("ir.SessionTime", updateSessionTime = function () {
            var ref, time;
            if (!data.isSessionEnds && (!forceUseSessionTime && 0 < (ref = ir.SessionTimeRemain) && ref < 604800 ? time = ir.SessionTimeRemain : ir.SessionTime > 0 && (time = ir.SessionTime - (null != raceStartsAt ? raceStartsAt : 0)), null != time)) return data.sessionTime = time, data.sessionTimeString = timeFormat(time, 0, !0)
        }), $rootScope.$watchGroup(["ir.SessionNum", "ir.SessionInfo", "ir.WeekendInfo", "ir.DriverInfo"], (function () {
            var calcTime, camCarClassId, driverClassId, j, k, l, lapTime, len, len1, len2, p, ref, ref1, ref2, results,
                s, session, time, time2;
            if (!data.isSessionEnds && ir.SessionInfo && ir.SessionNum >= 0 && ir.DriverInfo) {
                if (session = ir.SessionInfo.Sessions[ir.SessionNum], time = parseInt(session.SessionTime) || null, "Race" !== session.SessionType) data.sessionTotalTime = time > 0 ? time : null, data.sessionTotalTimeString = time > 0 ? sessionTimeFormat(time) : null; else if ("replay" === (null != (ref = ir.WeekendInfo) ? ref.SimMode : void 0)) time = parseInt(session.SessionTime) || null, (time2 = session.ResultsLapsComplete * session.ResultsAverageLapTime) > 0 && time2 < time && (time = time2), data.sessionTotalTime = time > 0 ? time : null, data.sessionTotalTimeString = time > 0 ? sessionTimeFormat(time) : null, forceUseSessionTime = !0; else if ((parseInt(session.SessionLaps) || null) > 0) {
                    if (lapTime = null, ir.CamCarIdx >= 0 && (camCarClassId = ir.DriversByCarIdx[ir.CamCarIdx].CarClassID), driverClassId = ir.DriversByCarIdx[ir.DriverInfo.DriverCarIdx].CarClassID, session.ResultsLapsComplete < 2) {
                        for (j = 0, len = (ref1 = ir.SessionInfo.Sessions).length; j < len; j++) if (-1 !== (s = ref1[j]).SessionType.search(/qual/i) && s.ResultsPositions) {
                            results = s.ResultsPositions;
                            break
                        }
                        if (null == results && (results = ir.QualifyResultsInfo && ir.QualifyResultsInfo.Results), null == results) for (k = 0, len1 = (ref2 = ir.SessionInfo.Sessions).length; k < len1; k++) -1 === (s = ref2[k]).SessionType.search(/race/i) && (results = s.ResultsPositions);
                        if (null != results && null != camCarClassId) for (l = 0, len2 = results.length; l < len2; l++) if (0 === (p = results[l]).ClassPosition && p.FastestTime > 0 && ir.DriversByCarIdx[p.CarIdx].CarClassID === camCarClassId) {
                            lapTime = p.FastestTime;
                            break
                        }
                        null == lapTime && null != camCarClassId && null != driverClassId && (lapTime = ir.DriverInfo.DriverCarEstLapTime)
                    } else null != camCarClassId && avgLapTimes.has(camCarClassId) ? lapTime = avgLapTimes.get(camCarClassId).avgLapTime : session.ResultsAverageLapTime > 0 && (lapTime = session.ResultsAverageLapTime);
                    lapTime > 0 && lastResultsLapsComplete !== session.ResultsLapsComplete && (lastResultsLapsComplete = session.ResultsLapsComplete, calcTime = (session.SessionLaps - Math.max(0, session.ResultsLapsComplete)) * lapTime, -1 !== lastResultsLapsComplete && (calcTime += ir.SessionTime), null != raceStartsAt && (calcTime -= raceStartsAt), (calcTime = 60 * Math.ceil((calcTime - 15) / 60)) > 0 && (time > 0 && calcTime > time ? (data.sessionTotalTime = time, data.sessionTotalTimeString = sessionTimeFormat(time)) : (data.sessionTotalTime = calcTime, data.sessionTotalTimeString = `≈${sessionTimeFormat(calcTime)}`, forceUseSessionTime = !0)))
                } else data.sessionTotalTime = time > 0 ? time : null, data.sessionTotalTimeString = time > 0 ? sessionTimeFormat(time) : null;
                return updateSessionTime()
            }
        })), $rootScope.$watch("ir.DriverInfo", (function () {
            var ref;
            if (ir.DriverInfo) return data.isDriverSpectating = null != (ref = ir.DriversByCarIdx[ir.DriverInfo.DriverCarIdx]) ? ref.IsSpectator : void 0
        })), data
    }))
}).call(this);
(function () {
    var IRacing, indexOf = [].indexOf;
    IRacing = class {
        constructor(requestParams = [], requestParamsOnce = [], fps = 1, server = "127.0.0.1:8182", readIbt = !1, record = null, zipLibPath = null) {
            this.requestParams = requestParams, this.requestParamsOnce = requestParamsOnce, this.fps = fps, this.server = server, this.readIbt = readIbt, this.record = record, this.zipLibPath = zipLibPath, this.data = {}, this.onConnect = null, this.onDisconnect = null, this.onUpdate = null, this.onBroadcast = null, this.ws = null, this.onWSConnect = null, this.onWSDisconnect = null, this.reconnectTimeout = null, this.connected = !1, this.firstTimeConnect = !0, null != this.record && this.loadRecord(), this.connect()
        }

        connect() {
            return this.ws = new WebSocket(`ws://${this.server}/ws`), this.ws.onopen = (...args) => this.onopen(...args), this.ws.onmessage = (...args) => this.onmessage(...args), this.ws.onclose = (...args) => this.onclose(...args)
        }

        close() {
            return this.ws.onclose = null, this.ws.close()
        }

        onopen() {
            var k;
            if ("function" == typeof this.onWSConnect && this.onWSConnect(), null != this.reconnectTimeout && clearTimeout(this.reconnectTimeout), null == this.record) {
                for (k in this.data) delete this.data[k];
                return this.ws.send(JSON.stringify({
                    fps: this.fps,
                    readIbt: this.readIbt,
                    requestParams: this.requestParams,
                    requestParamsOnce: this.requestParamsOnce
                }))
            }
        }

        onmessage(event) {
            var data, k, keys, ref, v;
            if (data = JSON.parse(event.data), null == this.record) {
                if (data.disconnected && (this.connected = !1, "function" == typeof this.onDisconnect && this.onDisconnect()), data.connected) for (k in this.data) delete this.data[k];
                if ((data.connected || this.firstTimeConnect && !this.connected && !data.broadcast) && (this.firstTimeConnect = !1, this.connected = !0, "function" == typeof this.onConnect && this.onConnect()), data.data) {
                    for (k in keys = [], ref = data.data) v = ref[k], keys.push(k), this.data[k] = v;
                    "function" == typeof this.onUpdate && this.onUpdate(keys)
                }
            }
            if (data.broadcast) return "function" == typeof this.onBroadcast ? this.onBroadcast(data.broadcast) : void 0
        }

        onclose() {
            return "function" == typeof this.onWSDisconnect && this.onWSDisconnect(), this.ws && (this.ws.onopen = this.ws.onmessage = this.ws.onclose = null), this.connected && (this.connected = !1, null == this.record && "function" == typeof this.onDisconnect && this.onDisconnect()), this.reconnectTimeout = setTimeout((() => this.connect.apply(this)), 2e3)
        }

        sendCommand(command, ...args) {
            return this.ws.send(JSON.stringify({command: command, args: args}))
        }

        broadcast(data) {
            return this.ws.send(JSON.stringify({broadcast: data}))
        }

        loadRecord() {
            var isZip, r;
            return isZip = this.zipLibPath && -1 !== this.record.search(/\.zip$/i), (r = new XMLHttpRequest).onreadystatechange = () => {
                var head, zipSrc;
                if (4 === r.readyState && 200 === r.status) return isZip ? (head = document.head, (zipSrc = document.createElement("script")).src = this.zipLibPath + "zip.js", head.appendChild(zipSrc), zipSrc.addEventListener("load", (() => {
                    var inflateSrc;
                    return zip.useWebWorkers = !1, (inflateSrc = document.createElement("script")).src = this.zipLibPath + "inflate.js", head.appendChild(inflateSrc), inflateSrc.addEventListener("load", (() => zip.createReader(new zip.BlobReader(r.response), (zipReader => zipReader.getEntries((entry => entry[0].getData(new zip.TextWriter, (text => (zipReader.close(), head.removeChild(inflateSrc), head.removeChild(zipSrc), this.onRecord(JSON.parse(text)))))))))))
                }))) : this.onRecord(r.response)
            }, r.open("GET", this.record, !0), r.responseType = isZip ? "blob" : "json", r.send()
        }

        onRecord(frames) {
            return this.connected = !0, "connected" in frames[0] || frames.unshift({connected: !0}), this.record = {
                frames: frames,
                requestedParamsOnce: []
            }, "function" == typeof this.onConnect ? this.onConnect() : void 0
        }

        playRecord(startFrame = 0, stopFrame = null, speed = 1) {
            var i;
            for (this.record.currentFrame = 0, "function" == typeof this.onConnect && this.onConnect(!1), i = startFrame; i-- >= 0;) this.record.currentFrame++, this.playRecordFrame(!1);
            return null != this.record.playInterval && clearInterval(this.record.playInterval), !speed || null != stopFrame && startFrame >= stopFrame ? this.record.currentFrame < this.record.frames.length - 1 ? setTimeout((() => (this.record.currentFrame++, this.playRecordFrame())), 1) : void 0 : this.record.playInterval = setInterval((() => this.record.currentFrame < this.record.frames.length - 1 && !(null != stopFrame && this.record.currentFrame >= stopFrame) ? (this.record.currentFrame++, this.playRecordFrame()) : clearInterval(this.record.playInterval)), 1e3 / speed)
        }

        resetRecord() {
            return null != this.record.playInterval && clearInterval(this.record.playInterval), setTimeout((() => {
                var k;
                for (k in this.record.requestedParamsOnce = [], this.data) delete this.data[k];
                return "function" == typeof this.onDisconnect && this.onDisconnect(), setTimeout((() => "function" == typeof this.onConnect ? this.onConnect() : void 0), 500)
            }), 100)
        }

        playRecordFrame(update = !0) {
            var data, k, keys, ref, v;
            if (null != (data = this.record.frames[this.record.currentFrame]) ? data.data : void 0) {
                for (k in keys = [], ref = data.data) v = ref[k], (indexOf.call(this.requestParams, "__all_telemetry__") >= 0 || indexOf.call(this.requestParams, k) >= 0 || indexOf.call(this.requestParamsOnce, k) >= 0 && indexOf.call(this.record.requestedParamsOnce, k) < 0) && (keys.push(k), this.data[k] = v, indexOf.call(this.requestParamsOnce, k) >= 0 && indexOf.call(this.record.requestedParamsOnce, k) < 0 && this.record.requestedParamsOnce.push(k));
                return "function" == typeof this.onUpdate ? this.onUpdate(keys, update) : void 0
            }
        }
    }, "undefined" != typeof window && null !== window && (window.IRacing = IRacing), null != ("undefined" != typeof module && null !== module ? module.exports : void 0) && (module.exports = IRacing)
}).call(this);