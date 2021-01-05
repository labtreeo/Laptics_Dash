// This file is required by the dash-index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

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

if(isElectron()) {
    const electron = require('electron');
    const windowStateKeeper = require('electron-window-state');
    const BrowserWindow = electron.remote.BrowserWindow;

    const remote = require('electron').remote;

    const win = remote.getCurrentWindow(); /* Note this is different to the
    html global `window` variable */

    // When document has loaded, initialise
    document.onreadystatechange = (event) => {
        if (document.readyState == "complete") {
            handleWindowControls();
        }
    };

    window.onbeforeunload = (event) => {
        /* If window is reloaded, remove win event listeners
        (DOM element listeners get auto garbage collected but not
        Electron win listeners as the win is not dereferenced unless closed) */
        win.removeAllListeners();
    }

    function handleWindowControls() {
        // Make minimise/maximise/restore/close buttons work when they are clicked
        document.getElementById('min-button').addEventListener("click", event => {
            win.minimize();
        });

        document.getElementById('close-button').addEventListener("click", event => {
            win.close();
        });
    }
}