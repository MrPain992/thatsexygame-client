function _gui() {
  this.closeWindow = function() {
    if(gui.confirm('Are you sure?'))
      ipcRenderer.send('userCloseWindow');
  }

  this.minimizeWindow = function() {
    ipcRenderer.send('userMinimizeWindow');
  }

  this.confirm = function(text) {
    return confirm(text);
  }
}
