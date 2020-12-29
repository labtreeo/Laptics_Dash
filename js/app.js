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

            $rootScope.mguCharging = Math.abs(ir.data['PowerMGU_K']);

            if (ir.data['dcHeadlightFlash'] === true){
                $rootScope.HeadlightFlash = true
                setTimeout(() => {  $rootScope.HeadlightFlash = false }, 2000);
            }

            if (ir.data['SessionInfo']['Sessions'][2]){
                $rootScope.SessionLaps = ir.data['SessionInfo']['Sessions'][2]['SessionLaps']
            }

            let onPitRoad = ir.data['OnPitRoad']
            let lastPitStop;

            if (onPitRoad === true) {
                lastPitStop = ir.data['Lap']
                localStorage.setItem("lastPitStop", lastPitStop);
            }

            $rootScope.lapsSincelastPitStop = ir.data['Lap'] - localStorage.getItem("lastPitStop");

            $rootScope.Throttle = ir.data['Throttle']
            $rootScope.Brake = ir.data['Brake']
            let clutch = ir.data['Clutch'];
            if(clutch < 1.01){
                let clutch2 = clutch - 1

                $rootScope.Clutch =  Math.abs(clutch2)
            }

            let currentDriverId = ir.data['PlayerCarIdx'];
            let drivers = ir.data['DriverInfo']['Drivers'];
            let lastLapTime = ir.data['CarIdxLastLapTime'];
            let bestLapTime = ir.data['CarIdxBestLapTime'];
            let classPositions = ir.data['CarIdxClassPosition'];
            let positions = ir.data['CarIdxPosition'];
            let CarIdxF2Time = ir.data['CarIdxF2Time'];

            let driverCarClassColor
            let driverId = positions.indexOf(positions[currentDriverId]);
            let driverFromId = drivers[driverId]

            if(driverId['CarClassColor'] !== 3395327 || driverId['CarClassColor'] !== 16767577 || driverId['CarClassColor'] !== 11430911 || driverId['CarClassColor'] !== 16777215 || driverId['CarClassColor'] === 5504887 || driverId['CarClassColor'] === 13849600){
                driverCarClassColor = '#' + driverFromId['CarClassColor'].toString(16);
            }

            if(driverId['CarClassColor'] === 0){
                driverCarClassColor = 'white';
            }

            $rootScope.driverCarClassColor = driverCarClassColor

            if (positions[currentDriverId] !== 0) {

                let driverAheadPos = positions[currentDriverId] - 1

                if (driverAheadPos >= 1 ) {
                    let driverAheadId = positions.indexOf(driverAheadPos);
                    let driverAheadName
                    let driverAheadCarClassColor

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

                    let driverAheadClassPos = classPositions[driverAheadId]
                    let driverAheadBestLapTimeRaw
                    if (ir.data['SessionNum'] < 2){
                        driverAheadBestLapTimeRaw = CarIdxF2Time[driverAheadId]
                    }else {
                        driverAheadBestLapTimeRaw = bestLapTime[driverAheadId]
                    }
                    let driverAheadBestLapTime

                    if (driverAheadBestLapTimeRaw > 0) {
                        driverAheadBestLapTime = moment.duration(driverAheadBestLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }
                    let driverAheadLastLapTimeRaw = lastLapTime[driverAheadId]
                    let driverAheadLastLapTime
                    if (driverAheadLastLapTimeRaw === -1) {
                        driverAheadLastLapTime = null
                    } else {
                        driverAheadLastLapTime = moment.duration(driverAheadLastLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }
                    
                    if(driverAheadCarClassColor === 3395327 || driverAheadCarClassColor === 5504887 || driverAheadCarClassColor === 11430911 || driverAheadCarClassColor === 16734344 || driverAheadCarClassColor === 13849600 || driverAheadCarClassColor === 16767577){
                        driverAheadCarClassColor = '#' + driverAheadCarClassColor.toString(16);
                    }
                    if(driverAheadCarClassColor === 0){
                        driverAheadCarClassColor = 'white';
                    }

                    let driverAheadGapRaw

                    if (ir.data['SessionNum'] < 2){
                        if (driverAheadBestLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                            driverAheadGapRaw = ir.data['LapBestLapTime'] - driverAheadBestLapTimeRaw
                        }
                    }else {
                        if (driverAheadBestLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                            driverAheadGapRaw = ir.data['LapLastLapTime'] - driverAheadLastLapTimeRaw
                        }
                    }

                    let driverAheadGap = moment.duration(driverAheadGapRaw, "seconds").format("s.SSS", { trim: false })

                    if (driverAheadId !== undefined) {

                        $rootScope.driverAheadPos = driverAheadPos
                        $rootScope.driverAheadClassPos = driverAheadClassPos
                        $rootScope.driverAheadBestLapTime = driverAheadBestLapTime
                        $rootScope.driverAheadLastLapTime = driverAheadLastLapTime
                        $rootScope.driverAheadGap = driverAheadGap
                        $rootScope.driverAheadCarClassColor = driverAheadCarClassColor
                        $rootScope.driverAheadName = driverAheadName
                    }
                }

                let driverBehindPos = positions[currentDriverId] + 1

                if (driverBehindPos > 1) {

                    let driverBehindId = positions.indexOf(driverBehindPos);
                    let driverBehindName
                    let driverBehindCarClassColor

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
                    
                    let driverBehindClassPos = classPositions[driverBehindId]
                    let driverBehindBestLapTimeRaw
                    if (ir.data['SessionNum'] < 2){
                        driverBehindBestLapTimeRaw = CarIdxF2Time[driverBehindId]
                    }else {
                        driverBehindBestLapTimeRaw = bestLapTime[driverBehindId]
                    }
                    let driverBehindBestLapTime

                    if (driverBehindBestLapTimeRaw > 0) {
                        driverBehindBestLapTime = moment.duration(driverBehindBestLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }
                    let driverBehindLastLapTimeRaw = lastLapTime[driverBehindId]
                    let driverBehindLastLapTime
                    if (driverBehindLastLapTimeRaw === -1) {
                        driverBehindLastLapTime = null
                    } else {
                        driverBehindLastLapTime = moment.duration(driverBehindLastLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    if(driverBehindCarClassColor === 3395327 || driverBehindCarClassColor === 5504887 || driverBehindCarClassColor === 11430911 || driverBehindCarClassColor === 16734344 || driverBehindCarClassColor === 13849600 || driverBehindCarClassColor === 16767577){
                        driverBehindCarClassColor = '#' + driverBehindCarClassColor.toString(16);
                    }
                    if(driverBehindCarClassColor === 0){
                        driverBehindCarClassColor = 'white';
                    }

                    let driverBehindGapRaw

                    if (ir.data['SessionNum'] < 2){
                        if (driverBehindBestLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                            driverBehindGapRaw = ir.data['LapBestLapTime'] - driverBehindBestLapTimeRaw
                        }
                    }else {
                        if (driverBehindBestLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                            driverBehindGapRaw = ir.data['LapLastLapTime'] - driverBehindLastLapTimeRaw
                        }
                    }

                    let driverBehindGap = moment.duration(driverBehindGapRaw, "seconds").format("s.SSS", { trim: false })

                    if (driverBehindId !== undefined) {

                        $rootScope.driverBehindPos = driverBehindPos
                        $rootScope.driverBehindClassPos = driverBehindClassPos
                        $rootScope.driverBehindBestLapTime = driverBehindBestLapTime
                        $rootScope.driverBehindLastLapTime = driverBehindLastLapTime
                        $rootScope.driverBehindGap = driverBehindGap
                        $rootScope.driverBehindCarClassColor = driverBehindCarClassColor
                        $rootScope.driverBehindName = driverBehindName
                    }
                }
            }

            return $rootScope.$apply();
        };

        $rootScope.backgroundColor = 'transparent'

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
    //             TrackTemp: 26.78,
    //             AirTemp: 24.56,
    //             SessionLapsRemain: 5467,
    //             CarLeftRight: 0
    //         }
    //     };
    //
    //     $rootScope.Throttle = .56
    //     $rootScope.Brake = 1
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
    //     $rootScope.driverBehindName = 'Dave Appleseed'
    //
    //     $rootScope.driverCarClassColor = '#FFCE33'
    //     $rootScope.driverAheadCarClassColor = '#FFCE33'
    //     $rootScope.driverBehindCarClassColor = '#ad6afe'
    //
    //     $rootScope.backgroundColor = 'grey'
    //
    //     return ir;
    // });

    app.controller('MainCtrl', function($scope, iRService, $http, $interval) {

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