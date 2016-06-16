/* ========== Window control ========== */
$('.titlebar__controls--minimize').on('click', function(){
  gui.minimizeWindow();
});

$('.titlebar__controls--close').on('click', function(){
  gui.closeWindow();
});

/* ========== Popup control ========== */
$('[data-dest]').on('click', function(){
  var destination = $(this).attr('data-dest');
  if(typeof $('[data-destname='+ destination +']') != 'undefined') {
    if(!$('[data-destname='+ destination +']').hasClass('popup--visible'))
      clearData(destination);
    $('[data-destname='+ destination +']').addClass('popup--visible');
  }
});

$('.page__popup [name=cancel]').on('click', function(){
  $(this).closest('.page__popup').removeClass('popup--visible');
});

function clearData(dest) {
  console.log(dest);
  switch(dest) {
    case 'registrationform':
      var login = $('#registration [name=login]');
      var password = $('#registration [name=password]');
      var password2 = $('#registration [name=confirmpassword]');

      $('#registration .error').empty();

      login.val('');
      password.val('');
      password2.val('');

      login.removeClass('validate');
      password.removeClass('validate');
      password2.removeClass('validate');
      break;
  }

}

/* ========== Login control ========== */

/* Registration */
$('[name=register]').on('click', function(){
  var login = $('#registration [name=login]');
  var password = $('#registration [name=password]');
  var password2 = $('#registration [name=confirmpassword]');
  $('#registration .error').empty();
  console.log('pucia')
  var good = true;
  var error = '';
  if(login.val() != '' && password.val() != '' && password2.val() != '') {
    if(!/^[a-zA-Z0-9]+$/.test(login.val())) {
      good = false;
      login.addClass('validate');
      error += "<div>• Dozwolone tylko litery i cyfry w nazwie</div>"
    }
    else {
      good = true;
      login.removeClass('validate');
    }

    if(password.val() != password2.val()) {
      good = false;
      password.addClass('validate');
      password2.addClass('validate');
      error += "<div>• Hasła nie są identyczne</div>"
    }
    else {
      good = true;
      password.removeClass('validate');
      password2.removeClass('validate');
    }
  }
  else {
    login.addClass('validate');
    password.removeClass('validate');
    password2.removeClass('validate');
    error = "<div>• Pola nie mogą być puste"
  }

  if(good){
    net.sendData('registration', { login: login.val(), password: password.val() })
  }

  $('#registration .error').html(error);

});
