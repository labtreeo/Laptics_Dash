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
            'CarIdxLap',
            'AirTemp',
            'TrackTemp',
            'SessionNum',
            'FuelUsePerHour',
            'SessionLapsRemain',
            'CarLeftRight',
            'LRCarLeft',
            'SessionInfo'
        ], [], 30, null,null, null);
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
            let classPositions = ir.data['CarIdxClassPosition'];
            let positions = ir.data['CarIdxPosition'];
            let CarIdxF2Time = ir.data['CarIdxF2Time'];
            let CarIdxLap = ir.data['CarIdxLap'];
            let clutch = ir.data['Clutch'];

            let driverCarClassColor
            let currentDriver = drivers[currentDriverId]
            let currentDriverGapToLeader = CarIdxF2Time[currentDriverId]

            let driverAheadPos
            let driverAheadId
            let driverAheadName
            let driverAheadCarClassColor
            let driverAheadClassPos
            let driverAheadLapTimeRaw
            let driverAheadLapTime
            let driverAheadLapTimeGapRaw
            let driverAheadLapTimeGap
            let driverAheadLiveGapRaw
            let driverAheadLiveGap
            let driverAheadGapToLeader

            let driverBehindPos
            let driverBehindId
            let driverBehindName
            let driverBehindCarClassColor
            let driverBehindClassPos
            let driverBehindLapTimeRaw
            let driverBehindLapTime
            let driverBehindLapTimeGapRaw
            let driverBehindLapTimeGap
            let driverBehindLiveGapRaw
            let driverBehindLiveGap
            let driverBehindGapToLeader

            $rootScope.mguCharging = Math.abs(ir.data['PowerMGU_K']);

            $rootScope.incPercentage = ir.data['PlayerCarTeamIncidentCount']/ir.data['WeekendInfo']['WeekendOptions.IncidentLimit']
            $rootScope.incYellow = $rootScope.incPercentage >= .8;
            $rootScope.incRed = ir.data['PlayerCarTeamIncidentCount'] >= ir.data['WeekendInfo']['WeekendOptions.IncidentLimit'];

            if (ir.data['dcHeadlightFlash'] === true){
                $rootScope.HeadlightFlash = true
                setTimeout(() => $rootScope.HeadlightFlash = false, 2000);
            }

            $rootScope.HysBoostHold = ir.data['dcHysBoostHold'] === true;

            if (ir.data['SessionInfo']['Sessions'][2]){
                $rootScope.SessionLaps = ir.data['SessionInfo']['Sessions'][2]['SessionLaps']
            }

            if (ir.data['OnPitRoad'] === true) {
                localStorage.setItem("lastPitStop", ir.data['Lap']);
            }

            $rootScope.lapsSincelastPitStop = ir.data['Lap'] - localStorage.getItem("lastPitStop");
            $rootScope.lastPitStop = localStorage.getItem("lastPitStop");

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
                        driverAheadLapTimeRaw = CarIdxF2Time[driverAheadId]
                    }else {
                        driverAheadLapTimeRaw = lastLapTime[driverAheadId]
                    }

                    if (driverAheadLapTimeRaw > 0) {
                        driverAheadLapTime = moment.duration(driverAheadLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    if( driverAheadCarClassColor > 0) {
                        driverAheadCarClassColor = '#' + driverAheadCarClassColor.toString(16);
                    }else if(driverAheadCarClassColor === 0){
                        driverAheadCarClassColor = 'white';
                    }

                    if (ir.data['SessionNum'] < 2){
                        if (driverAheadLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                            driverAheadLapTimeGapRaw = ir.data['LapBestLapTime'] - driverAheadLapTimeRaw
                        }
                    }else {
                        if (driverAheadLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                            driverAheadLapTimeGapRaw = ir.data['LapLastLapTime'] - driverAheadLapTimeRaw
                        }
                        driverAheadGapToLeader = CarIdxF2Time[driverAheadId]
                        driverAheadLiveGapRaw = currentDriverGapToLeader - driverAheadGapToLeader

                        if (CarIdxLap[driverAheadId] === CarIdxLap[currentDriverId]) {
                            driverAheadLiveGap = moment.duration(driverAheadLiveGapRaw, "seconds").format("s.SS", {trim: false})
                        }else{
                            driverAheadLiveGapRaw =  CarIdxLap[currentDriverId] - CarIdxLap[driverAheadId]
                            driverAheadLiveGapRaw = Math.abs(driverAheadLiveGapRaw)
                            console.log(driverAheadLiveGapRaw)
                            driverAheadLiveGap = '+' + driverAheadLiveGapRaw + ' Lap'
                        }
                    }

                    driverAheadLapTimeGap = moment.duration(driverAheadLapTimeGapRaw, "seconds").format("s.SS", { trim: false })

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
                        driverBehindLapTimeRaw = CarIdxF2Time[driverBehindId]
                    }else {
                        driverBehindLapTimeRaw = lastLapTime[driverBehindId]
                    }

                    if (driverBehindLapTimeRaw > 0) {
                        driverBehindLapTime = moment.duration(driverBehindLapTimeRaw, "seconds").format("mm:ss.SSS")
                    }

                    if( driverBehindCarClassColor > 0) {
                        driverBehindCarClassColor = '#' + driverBehindCarClassColor.toString(16);
                    }else if(driverBehindCarClassColor === 0){
                        driverBehindCarClassColor = 'white';
                    }

                    if (ir.data['SessionNum'] < 2){
                        if (driverBehindLapTimeRaw > 0 && ir.data['LapBestLapTime'] > 0) {
                            driverBehindLapTimeGapRaw = ir.data['LapBestLapTime'] - driverBehindLapTimeRaw
                        }
                    }else {
                        if (driverBehindLapTimeRaw > 0 && ir.data['LapLastLapTime'] > 0) {
                            driverBehindLapTimeGapRaw = ir.data['LapLastLapTime'] - driverBehindLapTimeRaw
                        }
                        driverBehindGapToLeader = CarIdxF2Time[driverBehindId]
                        driverBehindLiveGapRaw = currentDriverGapToLeader - driverBehindGapToLeader

                        if (CarIdxLap[driverBehindId] === CarIdxLap[currentDriverId]) {
                            driverBehindLiveGap = moment.duration(driverBehindLiveGapRaw, "seconds").format("s.SS", {trim: false})
                        }else{
                            driverBehindLiveGapRaw = CarIdxLap[driverBehindId] - CarIdxLap[currentDriverId]
                            driverBehindLiveGap = driverBehindLiveGapRaw + ' Lap'
                        }
                    }

                    driverBehindLapTimeGap = moment.duration(driverBehindLapTimeGapRaw, "seconds").format("s.SS", { trim: false })
                }

                $rootScope.driverAheadPos = driverAheadPos
                $rootScope.driverAheadClassPos = driverAheadClassPos
                $rootScope.driverAheadLapTime = driverAheadLapTime
                $rootScope.driverAheadLapTimeGap = driverAheadLapTimeGap
                $rootScope.driverAheadCarClassColor = driverAheadCarClassColor
                $rootScope.driverAheadName = driverAheadName
                $rootScope.driverAheadLiveGap = driverAheadLiveGap

                $rootScope.driverBehindPos = driverBehindPos
                $rootScope.driverBehindClassPos = driverBehindClassPos
                $rootScope.driverBehindLapTime = driverBehindLapTime
                $rootScope.driverBehindLapTimeGap = driverBehindLapTimeGap
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
    //             RPM: 4510,
    //             Gear: 6,
    //             RaceLaps: 124,
    //             ShiftIndicatorPct: .5,
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
    //             PlayerCarTeamIncidentCount: 12,
    //             IsOnTrack: true,
    //             dcABS: 12,
    //             WeekendInfo: {
    //                 WeekendOptions: {
    //                     IncidentLimit: 17
    //                 }
    //             },
    //             DriverInfo: {
    //                 Drivers: {
    //                     0 : {CarPath: 'test'},
    //                 },
    //                 DriverCarIdx: 0
    //             },
    //             EnergyERSBatteryPct: .8743,
    //             EnergyMGU_KLapDeployPct: .1247,
    //             PowerMGU_K: 0,
    //             FuelLevel: 7.89,
    //             LapLastLapTime: 102.645,
    //             LapBestLapTime: 101.543,
    //             LapOptimalLapTime: 199.546,
    //             SessionTimeRemain: 6899.435,
    //             OnPitRoad: false,
    //             PlayerCarIdx: 15,
    //             dcTractionControl: 12,
    //             Lap: 20,
    //             SessionLapsRemain: 24,
    //             Throttle: 1,
    //             Brake: 0,
    //             TrackTemp: 26.78,
    //             AirTemp: 24.56,
    //             SessionNum: 2,
    //             CarLeftRight: 0
    //         }
    //     };
    //
    //     $rootScope.Clutch = 0.35
    //
    //     $rootScope.lastPitStop = 10
    //
    //     $rootScope.driverAheadPos = 24
    //     $rootScope.driverAheadClassPos = 14
    //     $rootScope.driverAheadLapTime = '01:42.520'
    //     $rootScope.driverAheadName = 'Jimmy Orange'
    //     $rootScope.driverAheadLapTimeGap = 0.12
    //     $rootScope.driverAheadLiveGap = 12.34
    //
    //     $rootScope.driverBehindPos = 26
    //     $rootScope.driverBehindClassPos = 4
    //     $rootScope.driverBehindLapTime = '01:42.878'
    //     $rootScope.driverBehindName = 'Dave Appleseed'
    //     $rootScope.driverBehindLapTimeGap = -0.23
    //     $rootScope.driverBehindLiveGap = -4.76
    //
    //     $rootScope.driverCarClassColor = '#FFCE33'
    //     $rootScope.driverAheadCarClassColor = '#FFCE33'
    //     $rootScope.driverBehindCarClassColor = '#ad6afe'
    //
    //     $rootScope.backgroundColor = 'grey'
    //     $rootScope.HysBoostHold = false;
    //     $rootScope.SessionLaps = 45;
    //     $rootScope.HeadlightFlash = false;
    //
    //     $rootScope.incPercentage = ir.data.PlayerCarTeamIncidentCount/ir.data.WeekendInfo.WeekendOptions.IncidentLimit
    //     $rootScope.incYellow = $rootScope.incPercentage >= .8;
    //     $rootScope.incRed = ir.data.PlayerCarTeamIncidentCount >= ir.data.WeekendInfo.WeekendOptions.IncidentLimit;
    //
    //     return ir;
    // });

    app.controller('MainCtrl', function($rootScope, $scope, iRService, $http, $interval) {

        $scope.isElectron = isElectron();

        $interval(function() {
            $scope.CurrentTime = new Date()
        }, 100)

        return $scope.ir = iRService.data;
    });

    function isElectron() {
        if (typeof require !== 'function') return false;
        if (typeof window !== 'object') return false;
        try {
            const electron = require('electron');
            if (typeof electron !== 'object') return false;
        } catch(e) {
            return false;
        }
        return true;
    }

    if (isElectron()){
        const { ipcRenderer } = require('electron');
        const notification = document.getElementById('notification');
        const message = document.getElementById('message');

        ipcRenderer.on('update_available', () => {
            ipcRenderer.removeAllListeners('update_available');
            message.innerText = 'A new update is available. Downloading now...';
            notification.classList.remove('hidden');
        });

        ipcRenderer.on('update_downloaded', () => {
            ipcRenderer.removeAllListeners('update_downloaded');
            message.innerText = 'Update Downloaded. It will be installed on restart.';
            notification.classList.remove('hidden');
        });
    }

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