function _gui() {
  /* ========== Interaction popups control ========== */
  this.confirm = function(text) {
    return confirm(text);
  }

  this.alert = function(text) {
    return alert(text);
  }

  /* ========== Game status control ========== */
  this.connectionStatus = function(status) {
    console.log(status);
  }

  /* ========== Popup control ========== */
  this.popup = function(target, enabled) {
    if(enabled){
      var destination = target.attr('data-dest');
      if(typeof $('[data-destname='+ destination +']') != 'undefined') {
        if(!$('[data-destname='+ destination +']').hasClass('popup--visible'))
          gui.clearForms(destination);
        $('[data-destname='+ destination +']').addClass('popup--visible');
      }
    }
    else {
      target.closest('.page__popup').removeClass('popup--visible');
    }
  }

  /* ========== Validation control ========== */
  this.validate = function(type) {
    switch(type) {
      case 'register':
        validateRegister();
        break;
    }

    function validateRegister() {
      $('#registration .error').empty();
      var login = $('#registration [name=login]');
      var password = $('#registration [name=password]');
      var password2 = $('#registration [name=confirmpassword]');
      var good = true;
      var error = '';
      if(login.val() != '' && password.val() != '' && password2.val() != '') {
        if(!/^[a-zA-Z0-9]+$/.test(login.val())) {
          good = false;
          login.addClass('validate');
          error += "<div>• Dozwolone tylko litery i cyfry w nazwie</div>";
        }
        else {
          good = true;
          login.removeClass('validate');
        }

        if(password.val() != password2.val()) {
          good = false;
          password.addClass('validate');
          password2.addClass('validate');
          error += "<div>• Hasła nie są identyczne</div>";
        }
        else {
          good = true;
          password.removeClass('validate');
          password2.removeClass('validate');
        }
      }
      else {
        login.addClass('validate');
        password.addClass('validate');
        password2.addClass('validate');
        good = false;
        error = "<div>• Pola nie mogą być puste";
      }

      if(good){
        net.sendData('registration', { login: login.val(), password: password.val() })
      }

      $('#registration .error').html(error);
    }
  }

  /* ========== Clearing control ========== */
  this.clearForms = function(dest) {
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
}
