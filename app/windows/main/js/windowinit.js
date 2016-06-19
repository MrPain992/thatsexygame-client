connectionEstablished = false;

$.when(
  $.getScript('js/netlib.js'),
  $.getScript('js/guilib.js'),
  $.getScript('js/controlslib.js'),
  $.Deferred(function( deferred ){ $( deferred.resolve ); })
).done(function() {
  mainCompotentsLoadingComplete();
});




function mainCompotentsLoadingComplete() {
  // // =========================== Application menu ==============================
  // const {remote} = require('electron');
  // const {Menu, MenuItem} = remote;
  net = new _net();
  gui = new _gui();
}

socketError = false;
socketSuccess = false;

(function getSocket() {
$.getScript('http://localhost:20000/socket.io/socket.io.js')
  .fail(function() {
    if(!socketError){
      gui.connectionStatus(false);
      socketError = true;
      socketSuccess = false;
    }
    console.log('Socket disconected');
    setTimeout(getSocket, 1000);
  })
  .success(function() {
    if(!socketSuccess){
      gui.connectionStatus(true);
      socketioLoadingComplete();
      socketSuccess = true;
      socketError = false;
    }
    console.log('Socket connected');
    setTimeout(getSocket, 1000);
  });
})();

function socketioLoadingComplete() {
  socket = io('http://localhost:20000');
}
