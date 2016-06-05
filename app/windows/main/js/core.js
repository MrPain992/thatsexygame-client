function Core(){
  // =========================== Application menu ==============================
  const {remote} = require('electron');
  const {Menu, MenuItem} = remote;

    // ========================= Creating contextmenu ========================
    var menu = new Menu();
    menu.append(new MenuItem({
      label: 'Settings',
      click() {
        ipcRenderer.send("openSettings");
      }
    }));


    // () => { code; }  ==  function() { code; }
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      menu.popup(remote.getCurrentWindow());
    }, false);
    // =======================================================================

  var menu = Menu.buildFromTemplate([
    {
      label: "Launcher",
      submenu: [
        {
          label: "Settings",
          accelerator: 'CmdOrCtrl+S',
          click(){
            ipcRenderer.send('openSettings');
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
  // ===========================================================================

  net = new _net();
  ui = new _ui();
}
