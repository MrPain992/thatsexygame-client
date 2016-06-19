window.onload = function() {
  console.log('?')
  document.querySelector('.titlebar__controls--minimize').addEventListener('click', function() {
      ipcRenderer.send('userMinimizeWindow');
      console.log('!')
  }, true);

  document.querySelector('.titlebar__controls--close').addEventListener('click', function() {
      ipcRenderer.send('userCloseWindow');
  }, true);
}
