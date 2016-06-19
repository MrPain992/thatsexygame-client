/* ========== Popup control ========== */
$('[data-dest]').on('click', function(){
  gui.popup($(this), true);
});

$('.page__popup [name=cancel]').on('click', function(){
    gui.popup($(this), false);
});

/* ========== Login control ========== */

/* Registration */
$('[name=register]').on('click', function(){
  gui.validate('register');
});
