// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const kill = require('tree-kill');
const path = require('path')
const exec = require('child_process').spawn;
child = exec('app/server/server.exe', {detached: false});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// main.js

function createWindow () {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
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
    mainWindow.webContents.setZoomFactor(zoomFactor);
    mainWindow.setSize(500 * zoomFactor, 321 * zoomFactor)
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
