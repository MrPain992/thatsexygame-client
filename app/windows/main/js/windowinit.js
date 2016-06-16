$.when(
  $.getScript('http://localhost:20000/socket.io/socket.io.js'),
  $.getScript('js/netlib.js'),
  $.getScript('js/guilib.js'),
  $.getScript('js/controlslib.js'),
  $.Deferred(function( deferred ){ $( deferred.resolve ); })
).done(function() {
  loadingComplete();
});

function loadingComplete() {
  // =========================== Application menu ==============================
  const {remote} = require('electron');
  const {Menu, MenuItem} = remote;

    // ========================= Creating contextmenu ========================
    // const menu = new Menu();
    // menu.append(new MenuItem({
    //   label: 'Settings',
    //   click() {
    //     ipcRenderer.send("openSettings");
    //   }
    // }));
    //
    // window.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    //   menu.popup(remote.getCurrentWindow());
    // }, false);
    // =======================================================================

  // var menu = Menu.buildFromTemplate([
  //   {
  //     label: "Launcher",
  //     submenu: [
  //       {
  //         label: "Settings",
  //         accelerator: 'CmdOrCtrl+S',
  //         click(){
  //           ipcRenderer.send('openSettings');
  //         }
  //       }
  //     ]
  //   }
  // ]);
  // Menu.setApplicationMenu(menu);
  // ===========================================================================
  socket = io('http://localhost:20000');
  net = new _net();
  gui = new _gui();
}
