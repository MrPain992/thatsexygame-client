const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {ipcMain} = electron;

let mainWindow;
// var allWindows = []

function onReady() {
  mainWindow = new BrowserWindow({
    "minWidth": 1400,
    "minHeight": 700
  });
  mainWindow.loadURL(`file://${__dirname}/app/windows/main/index.html`);
  mainWindow.webContents.openDevTools();

  ipcMain.on('openSettings', function(event, arg) {
    if(typeof settingsWindow == "undefined"){
      settingsWindow = new BrowserWindow({
        "width": 600,
        "height": 400,
        "resizable": false,
        "alwaysOnTop": true
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

  ipcMain.on('openLobbyCreator', function(event, arg) {
    if(typeof newLobbyWindow == "undefined"){
      newLobbyWindow = new BrowserWindow({
        "width": 600,
        "height": 400,
        "resizable": false,
        "alwaysOnTop": true
      });
      newLobbyWindow.loadURL(`file://${__dirname}/app/windows/newLobby/index.html`);
      // newLobbyWindow.webContents.openDevTools();

      newLobbyWindow.on('closed', function(){
        delete newLobbyWindow;
      });
    }
    else {
      newLobbyWindow.show();
    }
  });
  ipcMain.on("newLobby", function(sender, data){
    mainWindow.webContents.send('newLobby', data);
    newLobbyWindow.close();
    delete newLobbyWindow;
  });

}

app.on('ready', onReady);
