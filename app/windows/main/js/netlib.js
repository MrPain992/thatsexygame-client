function _net() {
  this.sendData = function(event, data) {
    socket.emit(event, data);
  }
}
