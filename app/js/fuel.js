(function() {
    var app, onResponsiveVoiceReady, responsiveVoiceReady;

    responsiveVoiceReady = false;

    onResponsiveVoiceReady = null;

    app = angular.module('fuel-calc', ['ngRoute', 'mgcrea.ngStrap.navbar', 'LocalStorageModule', 'kutu.markdown', 'kutu.ir-service']);

    app.config(function($routeProvider) {
        return $routeProvider.when('/', {
            templateUrl: 'tmpl/index.html',
            controller: 'IndexCtrl'
        }).when('/help', {
            templateUrl: 'tmpl/help.html',
            title: 'Help'
        }).when('/settings', {
            templateUrl: 'tmpl/settings.html',
            controller: 'SettingsCtrl',
            title: 'Settings'
        }).otherwise({
            redirectTo: '/'
        });
    });

    app.config(function(localStorageServiceProvider) {
        return localStorageServiceProvider.setPrefix(app.name);
    });

    app.run(function($rootScope, $sce, localStorageService) {
        var settings;
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            var title;
            title = 'Fuel Calculator &middot; iRacing Browser Apps';
            if (current.$$route.title != null) {
                title = current.$$route.title + ' &middot; ' + title;
            }
            return $rootScope.title = $sce.trustAsHtml(title);
        });
        $rootScope.settings = settings = localStorageService.get('settings') || {};
        settings.host || (settings.host = null);
        if (settings.fuelPerLapPerTrack == null) {
            settings.fuelPerLapPerTrack = {};
        }
        if (settings.announceLang == null) {
            settings.announceLang = null;
        }
        if (settings.announceVolume == null) {
            settings.announceVolume = {};
        }
        if (settings.announceOn == null) {
            settings.announceOn = false;
        }
        if (settings.announceAtTrackPct == null) {
            settings.announceAtTrackPct = {};
        }
        if (settings.announcePerLap == null) {
            settings.announcePerLap = true;
        }
        if (settings.announcePerLapTmpl == null) {
            settings.announcePerLapTmpl = '{0} per lap.';
        }
        if (settings.announceRemainLaps == null) {
            settings.announceRemainLaps = true;
        }
        if (settings.announceRemainLapsTmpl == null) {
            settings.announceRemainLapsTmpl = 'remain {1} laps.';
        }
        if (settings.announceNeedRefuel == null) {
            settings.announceNeedRefuel = true;
        }
        if (settings.announceNeedRefuelTmpl == null) {
            settings.announceNeedRefuelTmpl = 'need {2} on pit-stop.';
        }
        if (settings.announceAfterLaps == null) {
            settings.announceAfterLaps = 3;
        }
        if (settings.announceDelay == null) {
            settings.announceDelay = 0;
        }
        if (settings.announceKeepSpeaking == null) {
            settings.announceKeepSpeaking = false;
        }
        if (!angular.isObject(settings.announceLang)) {
            settings.announceLang = responsiveVoice.getVoices()[0];
            settings.announceLang.lang = 'en';
        }
        responsiveVoice.setDefaultVoice(settings.announceLang.name);
        $rootScope.showAnnounceRow = settings.announcePerLap || settings.announceRemainLaps || settings.announceNeedRefuel;
        if (!$rootScope.showAnnounceRow) {
            $('.footer').hide();
        }
        $rootScope.settingUpdate = function(param, value) {
            if (param in $rootScope.settings) {
                $rootScope.settings[param] = value;
            }
            return $rootScope.saveSettings();
        };
        $rootScope.settingToggle = function(param) {
            if (param in $rootScope.settings) {
                $rootScope.settings[param] = !$rootScope.settings[param];
            }
            return $rootScope.saveSettings();
        };
        return $rootScope.saveSettings = function() {
            settings.host || (settings.host = null);
            if (settings.announceLang != null) {
                responsiveVoice.setDefaultVoice(settings.announceLang.name);
            }
            $rootScope.showAnnounceRow = settings.announcePerLap || settings.announceRemainLaps || settings.announceNeedRefuel;
            if ($rootScope.showAnnounceRow) {
                $('.footer').show();
            } else {
                $('.footer').hide();
            }
            return localStorageService.set('settings', $rootScope.settings);
        };
    });

    app.controller('IndexCtrl', function($scope, $timeout, iRService) {
        var delayTimeout, getVolume, ir, settings;
        settings = $scope.settings;
        ir = $scope.ir;
        delayTimeout = null;
        if ($.isEmptyObject(settings.announceAtTrackPct)) {
            $('[data-toggle=popover]').popover({
                placement: 'left',
                html: true,
                trigger: 'hover'
            });
        }
        getVolume = function() {
            return (settings.announceVolume[ir.carId] || settings.announceVolume["default"]) / 100 || 1;
        };
        $scope.$watch('ir.LapDistPct', function(n, o) {
            var announcePct;
            if ((n == null) || !ir.needToAnnounce) {
                return;
            }
            if (ir.RadioTransmitCarIdx !== -1) {
                return;
            }
            announcePct = null;
            if (ir.WeekendInfo != null) {
                announcePct = settings.announceAtTrackPct[ir.WeekendInfo.TrackID];
            }
            if ((announcePct != null) && n < announcePct) {
                return;
            }
            ir.needToAnnounce = false;
            if (settings.announceOn) {
                $timeout.cancel(delayTimeout);
                if (settings.announceAfterLaps > 0 && (ir.SessionInfo != null) && ir.SessionNum >= 0 && ir.SessionInfo.Sessions[ir.SessionNum].SessionType === 'Race' && ir.Lap >= settings.announceAfterLaps) {
                    return $scope.announce();
                } else if ((announcePct == null) && settings.announceDelay > 0) {
                    return delayTimeout = $timeout(function() {
                        return $scope.announce();
                    }, settings.announceDelay * 1000);
                } else {
                    return $scope.announce();
                }
            }
        });
        $scope.$watch('ir.RadioTransmitCarIdx', function(n, o) {
            if ((n != null) && n !== -1 && (!settings.announceKeepSpeaking) && responsiveVoice.isPlaying()) {
                responsiveVoice.cancel();
                return ir.needToAnnounce = true;
            }
        });
        $scope.announce = function() {
            var i, item, items, params, text, texts, v, _i, _j, _len, _len1;
            $timeout.cancel(delayTimeout);
            if ((ir.carId != null) && settings.announceVolume[ir.carId] === 0) {
                return;
            }
            texts = [];
            items = [[settings.announcePerLap, settings.announcePerLapTmpl, $scope.normalizeFuelLevel(ir.fuelPerLap)], [settings.announceRemainLaps, settings.announceRemainLapsTmpl, ir.fuelRemainLaps], [settings.announceNeedRefuel, settings.announceNeedRefuelTmpl, $scope.normalizeFuelLevel(ir.fuelNeedRefuel)]];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
                item = items[_i];
                if (item[0] && (item[2] != null) && item[2] > 0) {
                    params = [
                        item[2].toLocaleString(settings.announceLang.lang, {
                            maximumFractionDigits: 2
                        }), item[2].toLocaleString(settings.announceLang.lang, {
                            maximumFractionDigits: 1
                        }), Math.ceil(item[2]), Math.floor(item[2])
                    ];
                    text = item[1];
                    for (i = _j = 0, _len1 = params.length; _j < _len1; i = ++_j) {
                        v = params[i];
                        text = text.split("{" + i + "}").join(v);
                    }
                    texts.push(text);
                }
            }
            if (texts.length) {
                return responsiveVoice.speak(texts.join(' '), null, {
                    volume: getVolume()
                });
            }
        };
        $scope.toggleAnnounceOn = function() {
            $scope.settingToggle('announceOn');
            if (!settings.announceOn) {
                return responsiveVoice.cancel();
            }
        };
        return $scope.setAnnouncePointHere = function() {
            if (!ir.IsOnTrack || (ir.LapDistPct == null) || (ir.WeekendInfo == null)) {
                return false;
            }
            settings.announceAtTrackPct[ir.WeekendInfo.TrackID] = ir.LapDistPct;
            $scope.saveSettings();
            return true;
        };
    });

    app.directive('appAnnouncePoint', function($timeout) {
        return {
            link: function(scope, element, attrs) {
                var t;
                t = null;
                element.on('click', function() {
                    element.addClass('btn-announce-point');
                    if (scope.setAnnouncePointHere()) {
                        element.addClass('btn-success');
                    } else {
                        element.addClass('btn-danger');
                    }
                    return t = $timeout(function() {
                        element.removeClass('btn-success btn-danger');
                        return t = $timeout(function() {
                            return element.removeClass('btn-announce-point');
                        }, 100);
                    }, 1000);
                });
                return scope.$on('$destroy', function() {
                    return $timeout.cancel(t);
                });
            }
        };
    });

    app.directive('appFuelLevel', function() {
        return {
            link: function(scope, element, attrs) {
                var ir, updateFuelLevel;
                ir = scope.ir;
                element.text('0.00');
                updateFuelLevel = function() {
                    var fuel;
                    if (ir.FuelLevel == null) {
                        return;
                    }
                    fuel = scope.normalizeFuelLevel(ir.FuelLevel);
                    return element.text(fuel.toFixed(fuel < 100 ? 2 : 1));
                };
                scope.$watch('ir.DisplayUnits', updateFuelLevel);
                return scope.$watch('ir.FuelLevel', updateFuelLevel);
            }
        };
    });

    app.directive('appFuelPerLap', function() {
        return {
            link: function(scope, element, attrs) {
                var ir, updateFuelPerLap;
                ir = scope.ir;
                updateFuelPerLap = function() {
                    var fuel;
                    if (ir.fuelPerLap == null) {
                        element.text('-.--');
                        return;
                    }
                    fuel = scope.normalizeFuelLevel(ir.fuelPerLap);
                    return element.text(fuel <= 9.99 ? (Math.ceil(fuel * 100) / 100).toFixed(2) : (Math.ceil(fuel * 10) / 10).toFixed(1));
                };
                scope.$watch('ir.DisplayUnits', updateFuelPerLap);
                return scope.$watch('ir.fuelPerLap', updateFuelPerLap);
            }
        };
    });

    app.directive('appFuelRemainLaps', function() {
        return {
            link: function(scope, element, attrs) {
                return scope.$watch('ir.fuelRemainLaps', function(n, o) {
                    if (n == null) {
                        element.text('--.--');
                        return;
                    }
                    return element.text(n.toFixed(n < 100 ? 2 : 1));
                });
            }
        };
    });

    app.directive('appFuelNeedRefuel', function() {
        return {
            link: function(scope, element, attrs) {
                var ir, updateFuelNeedRefuel;
                ir = scope.ir;
                updateFuelNeedRefuel = function() {
                    var fuel;
                    if (ir.fuelNeedRefuel == null) {
                        element.text('--.-');
                        return;
                    }
                    fuel = scope.normalizeFuelLevel(ir.fuelNeedRefuel);
                    return element.text(fuel <= 9.99 ? (Math.ceil(fuel * 100) / 100).toFixed(2) : fuel <= 99.9 ? (Math.ceil(fuel * 10) / 10).toFixed(1) : Math.ceil(fuel));
                };
                scope.$watch('ir.DisplayUnits', updateFuelNeedRefuel);
                return scope.$watch('ir.fuelNeedRefuel', updateFuelNeedRefuel);
            }
        };
    });

    app.directive('appRaceLaps', function() {
        return {
            link: function(scope, element, attrs) {
                return scope.$watch('ir.raceLaps', function(n, o) {
                    var laps;
                    if (n == null) {
                        element.text('--.--');
                        return;
                    }
                    laps = n;
                    return element.text(laps <= 99.99 ? (Math.ceil(laps * 100) / 100).toFixed(2) : laps <= 999.9 ? (Math.ceil(laps * 10) / 10).toFixed(1) : Math.ceil(laps));
                });
            }
        };
    });

    app.directive('appRaceFuel', function() {
        return {
            link: function(scope, element, attrs) {
                var ir, updateRaceFuel;
                ir = scope.ir;
                updateRaceFuel = function() {
                    var fuel;
                    if (ir.raceFuel == null) {
                        element.text('--.-');
                        return;
                    }
                    fuel = scope.normalizeFuelLevel(ir.raceFuel);
                    return element.text(fuel <= 9.99 ? (Math.ceil(fuel * 100) / 100).toFixed(2) : fuel <= 99.9 ? (Math.ceil(fuel * 10) / 10).toFixed(1) : Math.ceil(fuel));
                };
                scope.$watch('ir.DisplayUnits', updateRaceFuel);
                return scope.$watch('ir.raceFuel', updateRaceFuel);
            }
        };
    });

    app.controller('SettingsCtrl', function($scope, $timeout, iRService) {
        var getVolume, ir, onResponsiveVoice, settings, testAnnounce;
        settings = $scope.settings;
        ir = $scope.ir;
        onResponsiveVoice = function() {
            var announceLangOptions, foundVoice, i, v, _i, _j, _len, _len1, _ref;
            announceLangOptions = angular.copy(responsiveVoice.getVoices());
            _ref = responsiveVoice.responsivevoices;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                v = _ref[_i];
                foundVoice = false;
                for (_j = 0, _len1 = announceLangOptions.length; _j < _len1; _j++) {
                    i = announceLangOptions[_j];
                    if (foundVoice) {
                        continue;
                    }
                    if (i.name === v.name) {
                        foundVoice = true;
                        i.lang = v.mappedProfile.systemvoice.lang || v.mappedProfile.collectionvoice.lang;
                    }
                }
            }
            return $timeout(function() {
                return $scope.announceLangOptions = announceLangOptions;
            }, 1);
        };
        if (responsiveVoiceReady) {
            onResponsiveVoice();
        } else {
            onResponsiveVoiceReady = onResponsiveVoice;
        }
        $('[data-toggle=popover]').popover({
            container: 'body',
            placement: 'auto',
            html: true,
            trigger: 'focus'
        });
        getVolume = function() {
            return (settings.announceVolume[ir.carId] || settings.announceVolume["default"]) / 100 || 1;
        };
        $scope.testAnnounceLanguage = function() {
            return testAnnounce('1 2 3');
        };
        $scope.testAnnouncePerLap = function() {
            return testAnnounce(settings.announcePerLapTmpl);
        };
        $scope.testAnnounceRemainLaps = function() {
            return testAnnounce(settings.announceRemainLapsTmpl, 20, 60);
        };
        $scope.testAnnounceNeedRefuel = function() {
            return testAnnounce(settings.announceNeedRefuelTmpl, 10, 40);
        };
        testAnnounce = function(text, start, end) {
            var i, params, v, value, _i, _len;
            if (start == null) {
                start = .1;
            }
            if (end == null) {
                end = 3;
            }
            value = start + (end - start) * Math.random();
            params = [
                value.toLocaleString(settings.announceLang.lang, {
                    maximumFractionDigits: 2
                }), value.toLocaleString(settings.announceLang.lang, {
                    maximumFractionDigits: 1
                }), Math.ceil(value), Math.floor(value)
            ];
            for (i = _i = 0, _len = params.length; _i < _len; i = ++_i) {
                v = params[i];
                text = text.split("{" + i + "}").join(v);
            }
            return responsiveVoice.speak(text, null, {
                volume: getVolume()
            });
        };
        $scope.announceVolume = 100;
        $scope.$watch('ir.carId', function(n, o) {
            if (n != null) {
                return $scope.announceVolume = settings.announceVolume[ir.carId] || 100;
            }
        });
        return $scope.announceVolumeChange = function() {
            var volume;
            volume = parseInt($scope.announceVolume);
            if (ir.carId != null) {
                settings.announceVolume[ir.carId] = volume;
            } else {
                settings.announceVolume["default"] = volume;
            }
            return $scope.saveSettings();
        };
    });

    app.directive('ngEnter', function() {
        return {
            link: function(scope, element, attrs) {
                return element.bind('keydown keypress', function(event) {
                    if (event.which === 13) {
                        scope.$apply(function() {
                            return scope.$eval(attrs.ngEnter);
                        });
                        return event.preventDefault();
                    }
                });
            }
        };
    });

    angular.bootstrap(document, [app.name]);

    responsiveVoice.OnVoiceReady = function() {
        responsiveVoiceReady = true;
        if (typeof onResponsiveVoiceReady === "function") {
            onResponsiveVoiceReady();
        }
        return onResponsiveVoiceReady = null;
    };

}).call(this);