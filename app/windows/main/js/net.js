function _net(){
  this.users = [];
  this.lobbies = [];
  this.currentServer = {
    type: "local",
    address: ""
  };

  //loading socket.io from localhost (default configuration)
  var url = "http://localhost:20000/socket.io/socket.io.js"
  $.ajax({
    url: url,
    dataType: "script",
    success: function(){
      socket = io("http://localhost:20000");
      console.log("connected with localhost");
    }
  });

  // obsługuje zmiane ustawień serwera z którym ma się łączyć
  ipcRenderer.on("serverSetting", function(event, data){
    if(data.type != net.currentServer.type){
      console.log("changing server");
      if(data.type == "local"){
        var url = "http://localhost:20000/socket.io/socket.io.js"
        $.ajax({
          url: url,
          dataType: "script",
          success: function(){
            socket = io("http://localhost:20000");
            console.log("connected with localhost");
            net.currentServer.type = "local";
          },
          error: function(jqXHR, textStatus, errorThrown){
            alert("Error while connecting with localhost: " + errorThrown);
          }
        });
      }
      else if(data.type == "official"){
        var url = "http://thatsexygame-server.herokuapp.com/socket.io/socket.io.js"
        $.ajax({
          url: url,
          dataType: "script",
          success: function(){
            socket = io("http://thatsexygame-server.herokuapp.com");
            console.log("connected with heroku");
            net.currentServer.type = "official";
          },
          error: function(jqXHR, textStatus, errorThrown){
            alert("Error while connecting with heroku: " + errorThrown);
          }
        });
      }
      else if(data.type == "remote"){
        var url = "http://" + data.address + "/socket.io/socket.io.js"
        $.ajax({
          url: url,
          dataType: "script",
          success: function(){
            socket = io("http://" + data.address);
            console.log("connected with " + data.address);
            net.currentServer.type = "remote";
            net.currentServer.address = data.address;
          },
          error: function(jqXHR, textStatus, errorThrown){
            alert("Error while connecting with server: " + errorThrown);
          }
        });
      }
    }
  })

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
