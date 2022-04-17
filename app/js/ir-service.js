(function() {
    var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    angular.module('kutu.ir-service', []).service('iRService', function($rootScope) {
        var avgLapTimes, calcNeedRefuel, carClassId, checkFlags, classCarIdxs, fuelWacther, fuels, iRService, ir, lapStarted, lapsComplete, lastDist, lastFuelLevel, loadedPrevFuelUsage, maxFuelLength, maxLapTimes, onDriverInfo, onWeekendInfo, settings, updateAvgLapTimes, updateCarFuelCalc, updateDriversByCarIdx, updateSessionLaps, useImpGal, useKg, watchPlayerTrackSurface;
        settings = $rootScope.settings;
        iRService = new IRacing(['DriverInfo', 'SessionInfo', 'QualifyResultsInfo', 'DisplayUnits', 'FuelLevel', 'IsInGarage', 'IsOnTrack', 'Lap', 'LapDistPct', 'LFwearR', 'OilTemp', 'PlayerTrackSurface', 'OnPitRoad', 'RadioTransmitCarIdx', 'SessionFlags', 'SessionNum', 'SessionState', 'SessionTime', 'SessionTimeRemain'], ['WeekendInfo'], 10, settings.host);
        $rootScope.ir = ir = iRService.data;
        iRService.onWSConnect = function() {
            $rootScope.wsConnected = true;
            return $rootScope.$apply();
        };
        iRService.onWSDisconnect = function() {
            $rootScope.wsConnected = false;
            return $rootScope.$apply();
        };
        iRService.onConnect = function() {
            ir.connected = true;
            return $rootScope.$apply();
        };
        iRService.onDisconnect = function() {
            ir.connected = false;
            return $rootScope.$apply();
        };
        iRService.onUpdate = function(keys) {
            if (__indexOf.call(keys, 'DriverInfo') >= 0) {
                updateDriversByCarIdx();
            }
            return $rootScope.$apply();
        };
        updateDriversByCarIdx = function() {
            var driver, _i, _len, _ref, _results;
            if (ir.DriversByCarIdx == null) {
                ir.DriversByCarIdx = {};
            }
            _ref = ir.DriverInfo.Drivers;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                driver = _ref[_i];
                _results.push(ir.DriversByCarIdx[driver.CarIdx] = driver);
            }
            return _results;
        };
        ir.needToAnnounce = false;
        ir.fuelPerLap = null;
        ir.fuelRemainLaps = null;
        ir.fuelNeedRefuel = null;
        ir.sessionLaps = null;
        ir.raceLaps = null;
        ir.raceFuel = null;
        useKg = false;
        useImpGal = false;
        $rootScope.normalizeFuelLevel = function(fuel) {
            if (useKg) {
                fuel *= ir.DriverInfo.DriverCarFuelKgPerLtr || .75;
            }
            if (!ir.DisplayUnits) {
                if (useImpGal) {
                    fuel *= 0.21996924829909;
                } else if (useKg) {
                    fuel *= 2.20462262;
                } else {
                    fuel *= 0.264172052;
                }
            }
            return fuel;
        };
        maxFuelLength = 5;
        fuels = [];
        lastDist = null;
        lapStarted = false;
        lapsComplete = 0;
        lastFuelLevel = null;
        fuelWacther = null;
        loadedPrevFuelUsage = false;
        carClassId = null;
        classCarIdxs = [];
        maxLapTimes = 5;
        avgLapTimes = {};
        watchPlayerTrackSurface = null;
        $rootScope.$watch('ir.DriverInfo', onDriverInfo = function(n, o) {
            var d, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
            if (n == null) {
                return;
            }
            _ref = ir.DriverInfo.Drivers;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                d = _ref[_i];
                if (d.CarIdx === ir.DriverInfo.DriverCarIdx) {
                    useKg = (_ref1 = d.CarID) === 33 || _ref1 === 39 || _ref1 === 71 || _ref1 === 77;
                    useImpGal = (_ref2 = d.CarID) === 25 || _ref2 === 42;
                    carClassId = d.CarClassID;
                    ir.carId = d.CarID;
                    break;
                }
            }
            _ref3 = ir.DriverInfo.Drivers;
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                d = _ref3[_j];
                if (d.CarClassID === carClassId) {
                    classCarIdxs.push(d.CarIdx);
                }
            }
            if (watchPlayerTrackSurface == null) {
                return watchPlayerTrackSurface = $rootScope.$watch('ir.PlayerTrackSurface', function(n, o) {
                    if (n === -1 || (o === 3 && n === 1) || (o === 1 && n === 3)) {
                        lastDist = null;
                        lastFuelLevel = null;
                        lapStarted = false;
                        return ir.needToAnnounce = false;
                    }
                });
            }
        });
        $rootScope.$watch('ir.WeekendInfo', onWeekendInfo = function(n, o) {
            var watchCarId;
            if ((n == null) || loadedPrevFuelUsage) {
                return;
            }
            loadedPrevFuelUsage = true;
            return watchCarId = $rootScope.$watch('ir.carId', function(n, o) {
                var f;
                if (n == null) {
                    return;
                }
                watchCarId();
                if (!fuels.length && $rootScope.settings.fuelPerLapPerTrack[ir.carId]) {
                    f = $rootScope.settings.fuelPerLapPerTrack[ir.carId][ir.WeekendInfo.TrackID];
                    if (f > 0) {
                        fuels.push(f);
                        updateCarFuelCalc(true);
                        return updateSessionLaps();
                    }
                }
            });
        });
        $rootScope.$watch('ir.LFwearR', function(n, o) {
            return lapStarted = false;
        });
        $rootScope.$watch('ir.SessionFlags', checkFlags = function() {
            var flags, _ref;
            flags = ir.SessionFlags;
            if ((flags == null) || flags === -1) {
                return false;
            } else if (flags & 0x200 && (((_ref = ir.WeekendInfo) != null ? _ref.EventType : void 0) !== 'Test') || flags & (0x0400 | 0x4000 | 0x8000 | 0x080000)) {
                lapStarted = false;
                return false;
            } else {
                return true;
            }
        });
        updateCarFuelCalc = function(updateDisplayOnly) {
            var curFuelLevel, dist, f, lapChanged, legitLap, pos, results, session, total, _base, _i, _len, _name;
            if (updateDisplayOnly == null) {
                updateDisplayOnly = false;
            }
            dist = ir.LapDistPct !== -1 ? ir.LapDistPct : null;
            curFuelLevel = ir.FuelLevel;
            lapChanged = false;
            if (ir.IsOnTrack) {
                if ((lastFuelLevel != null) && curFuelLevel > lastFuelLevel) {
                    lapStarted = false;
                }
                if (dist != null) {
                    if (dist < .1 && (lastDist != null) && lastDist > .9 && checkFlags()) {
                        lapChanged = lapStarted;
                        if (!lapStarted) {
                            updateDisplayOnly = true;
                            lastFuelLevel = curFuelLevel;
                        }
                        lapStarted = true;
                        if ((ir.SessionInfo != null) && (ir.SessionNum != null) && ir.SessionNum >= 0) {
                            session = ir.SessionInfo.Sessions[ir.SessionNum];
                            if (session.SessionType === 'Race') {
                                results = session.ResultsPositions;
                                if (results != null) {
                                    for (_i = 0, _len = results.length; _i < _len; _i++) {
                                        pos = results[_i];
                                        if (pos.CarIdx === ir.DriverInfo.DriverCarIdx) {
                                            lapsComplete = pos.LapsComplete + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    lastDist = dist;
                }
            }
            if (lapChanged && ir.SessionState === 4) {
                legitLap = !(ir.OnPitRoad || ir.SessionFlags & (0x4000 | 0x8000));
                if (legitLap && (curFuelLevel != null) && curFuelLevel >= 0 && (lastFuelLevel != null) && lastFuelLevel > curFuelLevel) {
                    fuels.push(lastFuelLevel - curFuelLevel);
                    console.log('last lap fuel usage', fuels[fuels.length - 1]);
                    while (fuels.length > maxFuelLength) {
                        fuels.shift();
                    }
                }
                lastFuelLevel = curFuelLevel;
            }
            if ((lapChanged || updateDisplayOnly) && fuels.length) {
                f = fuels.slice();
                if (f.length >= 3) {
                    f = f.sort().slice(1, -1);
                }
                total = f.reduce(function(a, b) {
                    return a + b;
                });
                ir.fuelPerLap = total / f.length;
                ir.fuelRemainLaps = curFuelLevel / ir.fuelPerLap;
                calcNeedRefuel();
                if (lapChanged && (ir.fuelPerLap != null) && (ir.carId != null) && (ir.WeekendInfo != null) && ir.WeekendInfo.TrackID) {
                    console.log('fuel per lap', ir.fuelPerLap, '| fuel remain laps', ir.fuelRemainLaps);
                    if ((_base = $rootScope.settings.fuelPerLapPerTrack)[_name = ir.carId] == null) {
                        _base[_name] = {};
                    }
                    $rootScope.settings.fuelPerLapPerTrack[ir.carId][ir.WeekendInfo.TrackID] = ir.fuelPerLap;
                    $rootScope.saveSettings();
                }
            }
            if (lapChanged && (ir.fuelPerLap != null) && (ir.fuelRemainLaps != null)) {
                return ir.needToAnnounce = true;
            }
        };
        $rootScope.$watch("ir.LapDistPct", function() {
            return updateCarFuelCalc();
        });
        calcNeedRefuel = function() {
            var laps;
            if ((ir.sessionLaps != null) && ir.sessionLaps > 0 && (lapsComplete != null)) {
                if (ir.sessionLaps < lapsComplete) {
                    return ir.fuelNeedRefuel = null;
                } else if (avgLapTimes[carClassId] != null) {
                    laps = Math.ceil(ir.sessionLaps) - Math.max(0, avgLapTimes[carClassId].lapsComplete, lapsComplete);
                    ir.fuelNeedRefuel = Math.max(0, (laps - ir.fuelRemainLaps) * ir.fuelPerLap);
                    if (ir.fuelNeedRefuel > 0) {
                        ir.fuelNeedRefuel += 0.5;
                    }
                    return console.log('laps left', laps, '| fuel need refuel', ir.fuelNeedRefuel);
                }
            }
        };
        $rootScope.$watch('ir.OnPitRoad', function(n, o) {
            if (n) {
                lapStarted = false;
                if (typeof fuelWacther === "function") {
                    fuelWacther();
                }
                return fuelWacther = $rootScope.$watch('ir.FuelLevel', function(n, o) {
                    if (ir.PlayerTrackSurface === 1) {
                        return updateCarFuelCalc(true);
                    }
                });
            } else {
                if (typeof fuelWacther === "function") {
                    fuelWacther();
                }
                return fuelWacther = null;
            }
        });
        $rootScope.$watch('ir.IsInGarage', function(n, o) {
            if (n) {
                if (typeof fuelWacther === "function") {
                    fuelWacther();
                }
                return fuelWacther = $rootScope.$watch('ir.FuelLevel', function(n, o) {
                    if (n > 0) {
                        return updateCarFuelCalc(true);
                    }
                });
            } else {
                if (typeof fuelWacther === "function") {
                    fuelWacther();
                }
                return fuelWacther = null;
            }
        });
        updateSessionLaps = function() {
            var avgRaceLaps, avgSessionLaps, firstClassLapTime, p, raceLaps, raceSession, raceSessionTime, results, s, session, sessionLaps, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
            if ((ir.SessionInfo == null) || !(ir.SessionNum >= 0) || !ir.DriverInfo) {
                ir.sessionLaps = null;
                return;
            }
            updateAvgLapTimes();
            session = ir.SessionInfo.Sessions[ir.SessionNum];
            lapsComplete = (_ref = avgLapTimes[carClassId]) != null ? _ref.lapsComplete : void 0;
            if (session.SessionType !== 'Race' || (lapsComplete == null) || lapsComplete < 2) {
                _ref1 = ir.SessionInfo.Sessions;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                    s = _ref1[_i];
                    if (s.SessionType === 'Race') {
                        raceSession = s;
                        break;
                    }
                }
                if (raceSession != null) {
                    raceLaps = parseInt(raceSession.SessionLaps) || null;
                    avgRaceLaps = null;
                    raceSessionTime = parseInt(raceSession.SessionTime);
                    if (raceSessionTime > 0) {
                        results = ir.QualifyResultsInfo && ir.QualifyResultsInfo.Results;
                        if (results == null) {
                            _ref2 = ir.SessionInfo.Sessions;
                            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                                s = _ref2[_j];
                                if (s.SessionType.search(/qual/i) !== -1) {
                                    if (s.ResultsPositions) {
                                        results = s.ResultsPositions;
                                        break;
                                    }
                                } else if (s.SessionType.search(/race/i) === -1) {
                                    results = s.ResultsPositions;
                                }
                            }
                        }
                        if (results != null) {
                            for (_k = 0, _len2 = results.length; _k < _len2; _k++) {
                                p = results[_k];
                                if (p.Position === 0 && p.FastestTime > 0) {
                                    firstClassLapTime = p.FastestTime;
                                }
                                if (p.ClassPosition === 0 && p.FastestTime > 0 && (_ref3 = p.CarIdx, __indexOf.call(classCarIdxs, _ref3) >= 0)) {
                                    if (p.Position !== 0 && firstClassLapTime > 0) {
                                        avgRaceLaps = Math.ceil(raceSessionTime / firstClassLapTime) * firstClassLapTime / p.FastestTime;
                                    } else {
                                        avgRaceLaps = raceSessionTime / p.FastestTime;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (((avgRaceLaps != null) && (raceLaps != null) && avgRaceLaps < raceLaps) || (avgRaceLaps != null) && (raceLaps == null)) {
                        ir.raceLaps = avgRaceLaps;
                    } else if (raceLaps != null) {
                        ir.raceLaps = raceLaps;
                    }
                    console.log('race laps based on qual or prac', ir.raceLaps);
                }
            } else {
                sessionLaps = parseInt(session.SessionLaps);
                ir.avgSessionLaps = null;
                if (sessionLaps > 0) {
                    ir.sessionLaps = sessionLaps;
                }
                if (avgLapTimes[carClassId] != null) {
                    avgSessionLaps = avgLapTimes[carClassId].sessionLaps;
                    if (session.ResultsOfficial) {
                        ir.sessionLaps = avgLapTimes[carClassId].lapsComplete;
                    } else if (isNaN(sessionLaps) || ((avgSessionLaps != null) && avgSessionLaps < sessionLaps - 1)) {
                        ir.sessionLaps = avgSessionLaps;
                        ir.avgSessionLaps = avgSessionLaps;
                    }
                }
                ir.raceLaps = ir.sessionLaps;
            }
            if ((ir.raceLaps != null) && (ir.fuelPerLap != null)) {
                return ir.raceFuel = 0.5 + ir.fuelPerLap * Math.ceil(ir.raceLaps);
            }
        };
        $rootScope.$watch('ir.SessionNum', updateSessionLaps);
        $rootScope.$watch('ir.SessionInfo', updateSessionLaps);
        updateAvgLapTimes = function() {
            var carClass, carClass2, data, fastClass, fastData, fastSessionTimeRemain, minLapTime, pos, results, session, t, total, totalTimeCounts, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;
            session = ir.SessionInfo.Sessions[ir.SessionNum];
            if (session.SessionType !== 'Race') {
                return;
            }
            results = session.ResultsPositions;
            if (results == null) {
                return;
            }
            _results = [];
            for (_i = 0, _len = results.length; _i < _len; _i++) {
                pos = results[_i];
                if (pos.ClassPosition !== 0 || (_ref = pos.CarIdx, __indexOf.call(classCarIdxs, _ref) < 0)) {
                    continue;
                }
                carClass = ir.DriversByCarIdx[pos.CarIdx].CarClassID.toString();
                data = avgLapTimes[carClass] != null ? avgLapTimes[carClass] : avgLapTimes[carClass] = {
                    lapsComplete: 0,
                    lapTimes: [],
                    avgLapTime: null,
                    sessionLaps: null,
                    sessionTimeRemain: null
                };
                if (pos.LapsComplete < 2 || pos.LapsComplete <= data.lapsComplete) {
                    continue;
                }
                data.lapsComplete = pos.LapsComplete;
                if (ir.SessionState === 4 && pos.LastTime > 0) {
                    data.lapTimes.push(pos.LastTime);
                    console.log('leader last lap time', pos.LastTime, 'for car class', carClass);
                    if ((ir.SessionTimeRemain != null) && (0 < (_ref1 = ir.SessionTimeRemain) && _ref1 < 604800)) {
                        while (data.lapTimes.length > maxLapTimes) {
                            data.lapTimes.shift();
                        }
                        total = 0;
                        minLapTime = 2 + Math.min.apply(null, data.lapTimes);
                        totalTimeCounts = 0;
                        _ref2 = data.lapTimes;
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            t = _ref2[_j];
                            if (t < minLapTime) {
                                total += t;
                                totalTimeCounts++;
                            }
                        }
                        data.avgLapTime = total / totalTimeCounts;
                        data.sessionTimeRemain = ir.SessionTimeRemain;
                        data.sessionLaps = data.lapsComplete + (ir.SessionTimeRemain + 5) / data.avgLapTime;
                        console.log('avg lap time', data.avgLapTime, '| time remain', data.sessionTimeRemain, '| laps', data.sessionLaps);
                        if (ir.WeekendInfo.NumCarClasses > 1) {
                            fastClass = null;
                            for (carClass2 in avgLapTimes) {
                                if (fastClass == null) {
                                    fastClass = carClass2;
                                } else if (avgLapTimes[carClass2].avgLapTime < avgLapTimes[fastClass].avgLapTime) {
                                    fastClass = carClass2;
                                }
                            }
                            if ((fastClass != null) && fastClass !== carClass) {
                                fastData = avgLapTimes[fastClass];
                                fastSessionTimeRemain = Math.ceil(fastData.sessionLaps - fastData.lapsComplete) * fastData.avgLapTime;
                                fastSessionTimeRemain -= fastData.sessionTimeRemain - data.sessionTimeRemain;
                                fastSessionTimeRemain = Math.max(1, fastSessionTimeRemain);
                                data.sessionLaps = data.lapsComplete + fastSessionTimeRemain / data.avgLapTime;
                                _results.push(console.log('recalc cause multiclass:', 'fast car class', fastClass, '| car class', carClass2, '| time remain', fastSessionTimeRemain, '| laps', sessionLaps));
                            } else {
                                _results.push(void 0);
                            }
                        } else {
                            _results.push(void 0);
                        }
                    } else {
                        _results.push(void 0);
                    }
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        };
        $rootScope.$watch('ir.connected', function(n, o) {
            fuels = [];
            lastDist = null;
            lapStarted = false;
            lapsComplete = 0;
            lastFuelLevel = null;
            carClassId = null;
            classCarIdxs = [];
            avgLapTimes = {};
            if (typeof watchPlayerTrackSurface === "function") {
                watchPlayerTrackSurface();
            }
            watchPlayerTrackSurface = null;
            loadedPrevFuelUsage = false;
            if (n) {
                ir.needToAnnounce = false;
                ir.fuelPerLap = null;
                ir.fuelRemainLaps = null;
                ir.fuelNeedRefuel = null;
                ir.sessionLaps = null;
                return ir.carId = null;
            }
        });
        return iRService;
    });

}).call(this);