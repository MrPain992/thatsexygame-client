function _net(){
  this.users = [];
  this.lobbies = [];

  this.login = function(nick, pass){
    socket.emit("login", {"nick": nick, "pass": pass} );
    socket.on("loginResponse", function(data){
      if(data){
        ui.initLobby();
        net.initGlobalChat();
        net.loadUsers();
        net.loadLobbies();

        $(window).on('beforeunload', function(){
          socket.emit('logout', { 'nick': $("#nickInput").val() } );
        });
      }
      else
        ui.alert("Błędny login lub hasło");
    });
  }

  this.loadUsers = function(){
    socket.emit("loadUsers");

    socket.on("updateUsers", function(data){
      net.users = data;

      $("#users").html("");
      for(var element of data)
        $("#users").append( $("<li>").html(element.nick) );
    });
  }

  this.loadLobbies = function(){
    socket.emit("loadLobbies");

    socket.on("updateLobbies", function(data){
      net.lobbies = data;

    });
  }

  // create socket listeners
  this.initGlobalChat = function(){
    socket.on("gMessage", function(data){
      text = data.nick + ": " + data.message;
      $("#globalChat").append( $("<li>").html(text) );

      ui.scrollToBottom();
    });
    socket.on("gLogin", function(data){
      $("#globalChat").append(
        $("<li>")
          .html( data.nick + " logged in." )
          .css( { "font-weight": "bold" } )
      );
      ui.scrollToBottom();
    });
    socket.on("gLogout", function(data){
      $("#globalChat").append(
        $("<li>")
          .html( data.nick + " disconnected." )
          .css( { "font-weight": "bold" } )
      );
      ui.scrollToBottom();
    });
  }
}
