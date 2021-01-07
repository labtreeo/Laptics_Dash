// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const { autoUpdater } = require('electron-updater');
const kill = require('tree-kill');
const path = require('path')
const exec = require('child_process').spawn;
child = exec('app/server/server.exe', {detached: false});
let splash
let mainWindow

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow () {

  mainWindow = new BrowserWindow({
    title: 'Laptics Dash',
    width: 500,
    height: 321,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    movable: true,
    useContentSize: true,

    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
    }
  });

  let zoomFactor = 1

  mainWindow.once('ready-to-show', () => {
    splash.destroy()
    mainWindow.webContents.setZoomFactor(zoomFactor);
    mainWindow.setSize(500 * zoomFactor, 321 * zoomFactor)

    autoUpdater.checkForUpdatesAndNotify();

  })

  mainWindow.webContents.session.clearStorageData()

  mainWindow.setMenuBarVisibility(false)
  // and load the dash-index.html of the app.
  mainWindow.loadFile('app/index.html')

  mainWindow.setAlwaysOnTop(true, 'screen');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on("close", closeAll)
}

function closeAll(){
  kill(child.pid);
  child.kill('SIGABRT')
  app.exit()
}

app.on('ready', () => {
  splash = new BrowserWindow({width: 300, height: 300, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadFile('app/splash.html');
  createWindow()
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

