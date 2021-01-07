#!python3
import irsdk
import time
import asyncio
import websockets
from irsdk import IRSDK
import json


# this is our State class, with some helpful variables
class State:
    ir_connected = False
    last_car_setup_tick = -1


# here we check if we are connected to iracing
# so we can retrieve some data
def check_iracing():
    if state.ir_connected and not (ir.is_initialized and ir.is_connected):
        state.ir_connected = False
        # don't forget to reset your State variables
        state.last_car_setup_tick = -1
        # we are shutting down ir library (clearing all internal variables)
        ir.shutdown()
        print('irsdk disconnected')
    elif not state.ir_connected and ir.startup() and ir.is_initialized and ir.is_connected:
        state.ir_connected = True
        print('irsdk connected')


# our main loop, where we retrieve data
# and do something useful with it
def loop():
    async def time(websocket, path):
        while True:
            # print(ir['Speed'])

            liveData = {
                'Speed': ir['Speed'],
                'RPM': ir['RPM'],
                'Gear': ir['Gear'],
                'SessionNum': ir['SessionNum'],
                'dcBrakeBias': ir['dcBrakeBias'],
                'dcPitSpeedLimiterToggle': ir['dcPitSpeedLimiterToggle'],
                'dcHysNoBoostToggle': ir['dcHysNoBoostToggle'],
                'dcHysBoostHold': ir['dcHysBoostHold'],
                'dcHeadlightFlash': ir['dcHeadlightFlash'],
                'LapDeltaToSessionBestLap': ir['LapDeltaToSessionBestLap'],
                'LapDeltaToSessionOptimalLap': ir['LapDeltaToSessionOptimalLap'],
                'LapDeltaToSessionLastlLap': ir['LapDeltaToSessionLastlLap'],
                'PlayerCarClassPosition': ir['PlayerCarClassPosition'],
                'PlayerCarPosition': ir['PlayerCarPosition'],
                'dcTractionControl3': ir['dcTractionControl3'],
                'dcMGUKDeployFixed': ir['dcMGUKDeployFixed'],
                'PlayerCarTeamIncidentCount': ir['PlayerCarTeamIncidentCount'],
                'IsOnTrack': ir['IsOnTrack'],
                'dcABS': ir['dcABS'],
                'WeekendInfo': ir['WeekendInfo'],
                'EnergyERSBatteryPct': ir['EnergyERSBatteryPct'],
                'EnergyMGU_KLapDeployPct': ir['EnergyMGU_KLapDeployPct'],
                'PowerMGU_K': ir['PowerMGU_K'],
                'FuelLevel': ir['FuelLevel'],
                'LapLastLapTime': ir['LapLastLapTime'],
                'LapBestLapTime': ir['LapBestLapTime'],
                'LapOptimalLapTime': ir['LapOptimalLapTime'],
                'SessionTimeRemain': ir['SessionTimeRemain'],
                'OnPitRoad': ir['OnPitRoad'],
                'PlayerCarIdx': ir['PlayerCarIdx'],
                'dcTractionControl': ir['dcTractionControl'],
                'ShiftIndicatorPct': ir['ShiftIndicatorPct'],
                'DriverInfo': ir['DriverInfo'],
                'IsReplayPlaying': ir['IsReplayPlaying'],
                'CarIdxClassPosition': ir['CarIdxClassPosition'],
                'CarIdxPosition': ir['CarIdxPosition'],
                'CarIdxLastLapTime': ir['CarIdxLastLapTime'],
                'CarIdxLap': ir['CarIdxLap'],
                'CarIdxBestLapTime': ir['CarIdxBestLapTime'],
                'CarIdxBestLapNum': ir['CarIdxBestLapNum'],
                'CarIdxEstTime': ir['CarIdxEstTime'],
                'CarIdxF2Time': ir['CarIdxF2Time'],
                'CarIdxOnPitRoad': ir['CarIdxOnPitRoad'],
                'SessionInfo': ir['SessionInfo'],
                'CarIdxLapDistPct': ir['CarIdxLapDistPct'],
                'AirTemp': ir['AirTemp'],
                'TrackTemp': ir['TrackTemp'],
                'SessionLapsRemain': ir['SessionLapsRemain'],
                'Lap': ir['Lap'],
                'Throttle': ir['Throttle'],
                'Brake': ir['Brake'],
                'Clutch': ir['Clutch'],
            }

            await websocket.send(json.dumps({'data': liveData}))
            await asyncio.sleep(0.033)

    start_server = websockets.serve(time, "127.0.0.1", 8180)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == '__main__':
    # initializing ir and state
    ir: IRSDK = irsdk.IRSDK()
    state = State()

    try:
        # infinite loop
        while True:
            # check if we are connected to iracing
            check_iracing()
            # if we are, then process data
            if state.ir_connected:
                loop()
            # sleep for 1 second
            # maximum you can use is 1/60
            # cause iracing updates data with 60 fps
            time.sleep(1)
    except KeyboardInterrupt:
        # press ctrl+c to exit
        pass
