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
  console.log('Loaded');
  gui = new _gui();
  net = new _net();
}
