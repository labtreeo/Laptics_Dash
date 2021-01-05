(function() {
    let app;

    app = angular.module('Dashboard', []);

    app.service('iRService', function($rootScope) {
        let ir;
        ir = new IRacing([
            'Speed',
            'RPM',
            'Gear',
            'dcBrakeBias',
            'dcPitSpeedLimiterToggle',
            'dcHysNoBoostToggle',
            'dcHysBoostHold',
            'dcHeadlightFlash',
            'LapDeltaToSessionBestLap',
            'LapDeltaToSessionOptimalLap',
            'LapDeltaToSessionLastlLap',
            'PlayerCarClassPosition',
            'dcTractionControl3',
            'dcMGUKDeployFixed',
            'PlayerCarTeamIncidentCount',
            'IsOnTrack',
            'dcABS',
            'WeekendInfo',
            'EnergyERSBatteryPct',
            'EnergyMGU_KLapDeployPct',
            'PowerMGU_K',
            'FuelLevel',
            'LapLastLapTime',
            'LapBestLapTime',
            'LapOptimalLapTime',
            'SessionTimeRemain',
            'OnPitRoad',
            'PlayerCarIdx',
            'dcTractionControl',
            'ShiftIndicatorPct',
            'DriverInfo',
            'Lap',
            'Throttle',
            'Brake',
            'Clutch',
            'PlayerCarPosition',
            'CarIdxLastLapTime',
            'CarIdxBestLapTime',
            'CarIdxClassPosition',
            'CarIdxPosition',
            'CarIdxF2Time',
            'AirTemp',
            'TrackTemp',
            'SessionNum',
            'FuelUsePerHour',
            'SessionLapsRemain',
            'CarLeftRight',
            'LRCarLeft',
            'SessionInfo'
        ], [], 30);
        ir.onConnect = function() {
            localStorage.setItem("lastPitStop", ir.data['Lap']);
            return console.log('connected');
        };
        ir.onDisconnect = function() {
            return console.log('disconnected');
        };
        ir.onUpdate = function() {

            let currentDriverId = ir.data['PlayerCarIdx'];
            let drivers = ir.data['DriverInfo']['Drivers'];
            let lastLapTime = ir.data['CarIdxLastLapTime'];
            let bestLapTime = ir.data['CarIdxBestLapTime'];
            let classPositions = ir.data['CarIdxClassPosition'];
            let positions = ir.data['CarIdxPosition'];
            let CarIdxF2Time = ir.data['CarIdxF2Time'];
            let clutch = ir.data['Clutch'];

            let driverCarClassColor
            let currentDriver = drivers[currentDriverId]

            let driverAheadPos
            let driverAheadId
            let driverAheadName
            let driverAheadCarClassColor
            let driverAheadClassPos
            let driverAheadBestLapTimeRaw
            let driverAheadBestLapTime
            let driverAheadLastLapTimeRaw
            let driverAheadLastLapTime
            let driverAheadGapRaw
            let driverAheadGap
            let driverAheadLiveGapRaw
            let driverAheadLiveGap

            let driverBehindPos
            let driverBehindId
            let driverBehindName
            let driverBehindCarClassColor
            let driverBehindClassPos
            let driverBehindBestLapTimeRaw
            let driverBehindBestLapTime
            let driverBehindLastLapTimeRaw
            let driverBehindLastLapTime
            let driverBehindGapRaw
            let driverBehindGap
            let driverBehindLiveGapRaw
            let driverBehindLiveGap

            $rootScope.mguCharging = Math.abs(ir.data['PowerMGU_K']);

            if (ir.data['dcHeadlightFlash'] === true){
                $rootScope.HeadlightFlash = true
                setTimeout(() => {  $rootScope.HeadlightFlash = false }, 2000);
            }

            if (ir.data['SessionInfo']['Sessions'][2]){
                $rootScope.SessionLaps = ir.data['SessionInfo']['Sessions'][2]['SessionLaps']
            }

            if (ir.data['OnPitRoad'] === true) {
                localStorage.setItem("lastPitStop", ir.data['Lap']);
            }

            $rootScope.lapsSincelastPitStop = ir.data['Lap'] - localStorage.getItem("lastPitStop");

            if(clutch < 1.01){
                $rootScope.Clutch =  Math.abs(clutch - 1)
            }

            if(currentDriver['CarClassColor'] > 0) {
                driverCarClassColor = '#' + currentDriver['CarClassColor'].toString(16);
            }else if(currentDriver['CarClassColor'] === 0){
                driverCarClassColor = 'white';
            }

            $rootScope.driverCarClassColor = driverCarClassColor

            if (positions[currentDriverId] !== 0) {

                driverAheadPos = positions[currentDriverId] - 1
                driverBehindPos = positions[currentDriverId] + 1

                if (driverAheadPos >= 1 ) {

                    driverAheadId = positions.indexOf(driverAheadPos);

                    for (const key in drivers) {
                        if (drivers.hasOwnProperty(key)) {
                            const driver = drivers[key];

                            if (driver['CarIdx'] === driverAheadId) {
                                driverAheadId = driver['CarIdx']
                                driverAheadName = driver['UserName']
                                driverAheadCarClassColor = driver['CarClassColor']
                            }
                        }
                    }

                    driverAheadClassPos = classPositions[driverAheadId]

                    if (ir.data['SessionNum'] < 2){
                        driverAheadBestLapTimeRaw = CarIdxF2Time[driverAheadId]
                    }else {
                        driverAheadBestLapTimeRaw = bestLapTime[driverAheadId]
                    }

                    if (driverAheadBestLapTimeRaw > 0) {
                        driverAheadBestLapTime = moment.duration(driverAheadBestLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    driverAheadLastLapTimeRaw = lastLapTime[driverAheadId]

                    if (driverAheadLastLapTimeRaw >0) {
                        driverAheadLastLapTime = moment.duration(driverAheadLastLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    if( driverAheadCarClassColor > 0) {
                        driverAheadCarClassColor = '#' + driverAheadCarClassColor.toString(16);
                    }else if(driverAheadCarClassColor === 0){
                        driverAheadCarClassColor = 'white';
                    }

                    if (ir.data['SessionNum'] < 2){
                        if (driverAheadBestLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                            driverAheadGapRaw = ir.data['LapBestLapTime'] - driverAheadBestLapTimeRaw
                        }
                    }else {
                        if (driverAheadBestLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                            driverAheadGapRaw = ir.data['LapLastLapTime'] - driverAheadLastLapTimeRaw
                        }
                        driverAheadLiveGapRaw = ir.data['CarIdxF2Time']
                    }

                    driverAheadLiveGap = moment.duration(driverAheadLiveGapRaw, "seconds").format("s.SS", { trim: false })
                    driverAheadGap = moment.duration(driverAheadGapRaw, "seconds").format("s.SS", { trim: false })

                }

                if (driverBehindPos > 1) {

                    driverBehindId = positions.indexOf(driverBehindPos);

                    for (const key in drivers) {
                        if (drivers.hasOwnProperty(key)) {
                            const driver = drivers[key];

                            if (driver['CarIdx'] === driverBehindId) {
                                driverBehindId = driver['CarIdx']
                                driverBehindName = driver['UserName']
                                driverBehindCarClassColor = driver['CarClassColor']
                            }
                        }
                    }

                    driverBehindClassPos = classPositions[driverBehindId]

                    if (ir.data['SessionNum'] < 2){
                        driverBehindBestLapTimeRaw = CarIdxF2Time[driverBehindId]
                    }else {
                        driverBehindBestLapTimeRaw = bestLapTime[driverBehindId]
                    }

                    if (driverBehindBestLapTimeRaw > 0) {
                        driverBehindBestLapTime = moment.duration(driverBehindBestLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    driverBehindLastLapTimeRaw = lastLapTime[driverBehindId]

                    if (driverBehindLastLapTimeRaw > 0){
                        driverBehindLastLapTime = moment.duration(driverBehindLastLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    if( driverBehindCarClassColor > 0) {
                        driverBehindCarClassColor = '#' + driverBehindCarClassColor.toString(16);
                    }else if(driverBehindCarClassColor === 0){
                        driverBehindCarClassColor = 'white';
                    }

                    if (ir.data['SessionNum'] < 2){
                        if (driverBehindBestLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                            driverBehindGapRaw = ir.data['LapBestLapTime'] - driverBehindBestLapTimeRaw
                        }
                    }else {
                        if (driverBehindBestLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                            driverBehindGapRaw = ir.data['LapLastLapTime'] - driverBehindLastLapTimeRaw
                        }
                        driverBehindLiveGapRaw = ir.data['CarIdxF2Time']
                    }

                    driverBehindLiveGap = moment.duration(driverBehindLiveGapRaw, "seconds").format("s.SS", { trim: false })
                    driverBehindGap = moment.duration(driverBehindGapRaw, "seconds").format("s.SS", { trim: false })
                }

                $rootScope.driverAheadPos = driverAheadPos
                $rootScope.driverAheadClassPos = driverAheadClassPos
                $rootScope.driverAheadBestLapTime = driverAheadBestLapTime
                $rootScope.driverAheadLastLapTime = driverAheadLastLapTime
                $rootScope.driverAheadGap = driverAheadGap
                $rootScope.driverAheadCarClassColor = driverAheadCarClassColor
                $rootScope.driverAheadName = driverAheadName
                $rootScope.driverAheadLiveGap = driverAheadLiveGap

                $rootScope.driverBehindPos = driverBehindPos
                $rootScope.driverBehindClassPos = driverBehindClassPos
                $rootScope.driverBehindBestLapTime = driverBehindBestLapTime
                $rootScope.driverBehindLastLapTime = driverBehindLastLapTime
                $rootScope.driverBehindGap = driverBehindGap
                $rootScope.driverBehindCarClassColor = driverBehindCarClassColor
                $rootScope.driverBehindName = driverBehindName
                $rootScope.driverBehindLiveGap = driverBehindLiveGap
            }

            return $rootScope.$apply();
        };
        return ir;
    });

    // app.service('iRService', function($rootScope) {
    //
    //     let ir;
    //     ir = {
    //         data : {
    //             Speed: 90,
    //             RPM: 6723,
    //             Gear: 6,
    //             RaceLaps: 124,
    //             ShiftIndicatorPct: .75,
    //             dcBrakeBias: 51,
    //             dcPitSpeedLimiterToggle: false,
    //             dcHysNoBoostToggle: false,
    //             dcHysBoostHold: false,
    //             dcHeadlightFlash: false,
    //             LapDeltaToSessionLastlLap: -2.44,
    //             LapDeltaToSessionBestLap: -1.24,
    //             LapDeltaToSessionOptimalLap: 2.54,
    //             PlayerCarClassPosition: 15,
    //             PlayerCarPosition: 25,
    //             dcTractionControl3: 1.35,
    //             dcMGUKDeployFixed: 12,
    //             PlayerCarTeamIncidentCount: 42,
    //             IsOnTrack: true,
    //             dcABS: 12,
    //             WeekendInfo: {
    //                 WeekendOptions: {
    //                     IncidentLimit: 100
    //                 }
    //             },
    //             DriverInfo: {
    //                 Drivers: {
    //                     0 : {CarPath: 'test'},
    //                 },
    //                 DriverCarIdx: 0
    //             },
    //             EnergyERSBatteryPct: .874,
    //             EnergyMGU_KLapDeployPct: .124,
    //             PowerMGU_K: 0,
    //             FuelLevel: 7.89,
    //             LapLastLapTime: 203.455,
    //             LapBestLapTime: 201.543,
    //             LapOptimalLapTime: 199.546,
    //             SessionTimeRemain: 56899.435,
    //             OnPitRoad: false,
    //             PlayerCarIdx: 15,
    //             dcTractionControl: 12,
    //             Lap: 178,
    //             Throttle: .56,
    //             Brake: 1,
    //             TrackTemp: 26.78,
    //             AirTemp: 24.56,
    //             SessionLapsRemain: 5467,
    //             CarLeftRight: 0
    //         }
    //     };
    //
    //     $rootScope.Clutch = 0.35
    //
    //     $rootScope.lapsSincelastPitStop = '26'
    //
    //     $rootScope.driverAheadPos = '24'
    //     $rootScope.driverAheadClassPos = '14'
    //     $rootScope.driverAheadBestLapTime = '03:20:540'
    //     $rootScope.driverAheadLastLapTime = '03:20:540'
    //     $rootScope.driverAheadName = 'Jimmy Orange'
    //     $rootScope.driverAheadGap = '0.497'
    //
    //     $rootScope.driverBehindPos = '26'
    //     $rootScope.driverBehindClassPos = '4'
    //     $rootScope.driverBehindBestLapTime = '03:22:056'
    //     $rootScope.driverBehindLastLapTime = '03:22:578'
    //     $rootScope.driverBehindGap = '-0.512'
    //
    //     $rootScope.driverBehindName = 'Dave Appleseed twehrtregfhfghfgjhgf'
    //
    //     $rootScope.driverCarClassColor = '#FFCE33'
    //     $rootScope.driverAheadCarClassColor = '#FFCE33'
    //     $rootScope.driverBehindCarClassColor = '#ad6afe'
    //
    //     $rootScope.backgroundColor = 'grey'
    //
    //     return ir;
    // });

    app.controller('MainCtrl', function($rootScope, $scope, iRService, $http, $interval) {

        $interval(function() {
            $scope.CurrentTime = new Date()
        }, 100)

        return $scope.ir = iRService.data;
    });

    app.filter('customNumber', function() {
        return function(value) {
            return parseInt(value, 10)
        }
    })

    app.filter('plusOrMinus', function(){
        return function(input){
            input = input ? input : 0
            return input > 0 ? "+"+input : input
        }
    });

    app.filter('percentage', function(){
        return function(input){
            input = input ? input : 0
            return  input + " %"
        }
    });

    app.filter('toMinSec', function(){
        return function(input){
            return (moment.duration(input, "seconds").format("mm:ss.SSS"));
        }
    });

    app.filter('secondsToDateTime', [function() {
        return function(seconds) {
            return (moment.duration(seconds, "seconds").format("hh:mm:ss", {trim: false}));
        };
    }]);

    app.filter('makePositive', function() {
        return function(num) { return Math.abs(num); }
    });

    angular.bootstrap(document, [app.name]);

}).call(this);