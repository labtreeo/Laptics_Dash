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
    frame: false,
    height: 283,
    width: 500,
    transparent: true,
    resizable: false,
    maximizable: false,
    movable: true,
    useContentSize: true,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
    }
  });

  let zoomFactor = 1

  let widthRaw = mainWindow.getSize()[0] * zoomFactor
  let heightRaw = mainWindow.getSize()[1] * zoomFactor

  let width = parseInt(widthRaw.toFixed(0))
  let height = parseInt(heightRaw.toFixed(0))

  mainWindow.once('ready-to-show', () => {
    splash.destroy()
    mainWindow.webContents.setZoomFactor(zoomFactor);
    mainWindow.setSize(width, height)

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
  splash = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  splash.loadFile('app/splash.html');
  setTimeout(function () {
    createWindow()
  }, 750);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('lmp1', (event, arg) => {
  mainWindow.setSize(500,321)
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

