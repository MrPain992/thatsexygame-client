const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = require('electron');

let mainWindow;
var allWindows = []

function onReady() {
  mainWindow = new BrowserWindow({
    "minWidth": 1000,
    "minHeight": 700
  });
  mainWindow.loadURL(`file://${__dirname}/app/windows/main/index.html`);
  // mainWindow.webContents.openDevTools();
  allWindows.push(mainWindow);

  ipcMain.on('openSettings', function(event, arg) {
    if(typeof settingsWindow == "undefined"){
      settingsWindow = new BrowserWindow({
        "width": 600,
        "height": 400,
        "resizable": true,
        // "alwaysOnTop": true
      });
      settingsWindow.loadURL(`file://${__dirname}/app/windows/settings/index.html`);
      // settingsWindow.webContents.openDevTools();

      settingsWindow.on('closed', function(){
        delete settingsWindow;
      });

      // event.sender.send('asynchronous-reply', "derp");
    }
    else {
      settingsWindow.show();
    }
  });
  ipcMain.on("serverSetting", function(sender, data){
    mainWindow.webContents.send('serverSetting', data);
  });

}

app.on('ready', onReady);
