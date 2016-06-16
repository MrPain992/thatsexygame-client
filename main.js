const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = require('electron');

let mainWindow;
let gameWindow;
var allWindows = []


// ========================================================================================
// New onReady function for game development. Uncomment after game completion or if not needed.
// ========================================================================================

function onReady(){
  mainWindow = new BrowserWindow({
    'width': 1200,
    'height': 700,
    'frame': false,
    'resizable': false,
    'maximizable': false,
    'fullscreenable': false,
    'standard-window': false
  });
  mainWindow.loadURL(`file://${__dirname}/app/windows/main/index.html`);
  //mainWindow.webContents.openDevTools();
  mainWindow.show();

  /* ========== Events ==========*/
  ipcMain.on('userMinimizeWindow', function(){
    mainWindow.minimize();
  });

  ipcMain.on('userCloseWindow', function(){
      mainWindow.close();
  });

  // gameWindow = new BrowserWindow({
  //   'minWidth': 1000,
  //   'minHeight': 700,
  //   'fullscreen': true,
  //   'frame': false
  // });
  // gameWindow.loadURL(`file://${__dirname}/app/windows/game/index.html`);
  // gameWindow.webContents.openDevTools()
}

// function onReady() {
//   mainWindow = new BrowserWindow({
//     "minWidth": 1000,
//     "minHeight": 700
//   });
//   mainWindow.loadURL(`file://${__dirname}/app/windows/main/index.html`);
//   // mainWindow.webContents.openDevTools();
//   allWindows.push(mainWindow);
//
//   ipcMain.on('openSettings', function(event, arg) {
//     if(typeof settingsWindow == "undefined"){
//       settingsWindow = new BrowserWindow({
//         "width": 600,
//         "height": 400,
//         "resizable": true,
//         // "alwaysOnTop": true
//       });
//       settingsWindow.loadURL(`file://${__dirname}/app/windows/settings/index.html`);
//       // settingsWindow.webContents.openDevTools();
//
//       settingsWindow.on('closed', function(){
//         delete settingsWindow;
//       });
//
//       // event.sender.send('asynchronous-reply', "derp");
//     }
//     else {
//       settingsWindow.show();
//     }
//   });
//   ipcMain.on("serverSetting", function(sender, data){
//     mainWindow.webContents.send('serverSetting', data);
//   });
// }

app.on('ready', onReady);
