// This file is required by the dash-overlay-index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const electron = require('electron');
const windowStateKeeper = require('electron-window-state');
const BrowserWindow = electron.remote.BrowserWindow;

if (localStorage.getItem('isDashOpen') === null){
    localStorage.setItem('isDashOpen', 'false')
}

// if (localStorage.getItem('isDashOpen') === 'true'){
//     localStorage.setItem('isDashOpen', 'false')
//     openDashboard()
// }

function openDashboard () {

    if (localStorage.getItem('isDashOpen') === 'false'){

        let dashboardWindowState = windowStateKeeper({
            defaultWidth: 1000,
            defaultHeight: 800
        });

        const Dashboard = new BrowserWindow({
            title: 'Dashboard',
            'x': dashboardWindowState.x,
            'y': dashboardWindowState.y,
            width: 700,
            height: 500,
            frame: false,
            transparent: true,
            resizable: false,
            maximizable: false,
            movable: true,
            fullscreen: false
        });

        Dashboard.showInactive()

        //Dashboard.webContents.openDevTools()
        Dashboard.on('focus', focussed)
        Dashboard.on('blur', blurred)

        function focussed() {
            Dashboard.setIgnoreMouseEvents(false)
        }

        function blurred(){
            Dashboard.setIgnoreMouseEvents(true)
        }

        Dashboard.setIgnoreMouseEvents(true)

        dashboardWindowState.manage(Dashboard);

        Dashboard.on("close", test)

        Dashboard.setAlwaysOnTop(true, 'screen');
        Dashboard.loadFile('overlay/overlay-index.html')
        localStorage.setItem('dashId', Dashboard.id)
        localStorage.setItem('isDashOpen', 'true')
    }

}

function test() {
    localStorage.setItem('dashId', null)
    localStorage.setItem('isDashOpen', 'false')
}

function closeDashboard() {

    let dashId = parseInt(localStorage.getItem('dashId'))
    localStorage.setItem('dashId', null)
    localStorage.setItem('isDashOpen', 'false')
    BrowserWindow.fromId(dashId).close()

}