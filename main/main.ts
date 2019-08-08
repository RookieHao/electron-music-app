
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolve } from 'path';
import { format as formatUrl } from 'url'

const IS_DEBUG: boolean = process.env.NODE_ENV === 'development'

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 670,
    minWidth:1024,
    minHeight:670,
    frame: false,
    backgroundColor: '#FAFAFA',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.

  // mainWindow.loadFile('index.html')
  if (IS_DEBUG) {
    mainWindow.loadURL(`http://localhost:3000`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  
    // const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
  
    // [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
    //   installExtension(extension)
    //       .then((name:any) => console.log(`Added Extension: ${name}`))
    //       .catch((err:any) => console.log('An error occurred: ', err));
    // });

  } else {
    mainWindow.loadURL(formatUrl({
      pathname: resolve(__dirname, '../render/index.html'),
      protocol: 'file',
      slashes: true
    }));
    new AppUpdater();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.