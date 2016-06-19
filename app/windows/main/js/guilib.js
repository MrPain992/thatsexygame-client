function _gui() {
  this.closeWindow = function() {
    ipcRenderer.send('userCloseWindow');
  }

  this.minimizeWindow = function() {
    ipcRenderer.send('userMinimizeWindow');
  }

  this.confirm = function(text) {
    return confirm(text);
  }

  this.alert = function(text) {
    return alert(text);
  }

  this.connectionStatus = function(status) {
    
  }
}
