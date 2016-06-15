/* ========== Window control ==========*/
$('.titlebar__controls--minimize').on('click', function(){
  gui.minimizeWindow();
});

$('.titlebar__controls--close').on('click', function(){
  gui.closeWindow();
});
