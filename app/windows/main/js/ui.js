function _ui(){
  var errorBorder = "2px solid #a33";


  var mode = "login";
  $("")

  $("#loginForm input").on("change", function(){
    $(this).css( {"border": "2px solid #bbb" } );
  });

  $("#registerButton").click(function(){
    $("#loginModeDiv").addClass("hidden");
    mode = "register";
  });
  $("#backButton").click(function(){
    $("#loginModeDiv").removeClass("hidden");
    mode = "login";
  });

  $("#loginForm").submit(function(){
    event.preventDefault();
    var flag = true; // true -> ok to login/register


    if( $("#nickInput").val() == ""){
      $("#nickInput").css({"border": errorBorder});
      flag = false;
    }
    if( $("#passInput").val() == ""){
      $("#passInput").css({"border": errorBorder});
      flag = false;
    }
    if(mode == "register"){
      if( $("#confPassInput").val() == ""){
        $("#confPassInput").css({"border": errorBorder});
        flag = false;
      }
    }

    if(mode == "login" && flag){
      net.login( $("#nickInput").val(), $("#passInput").val() );
    }
    else if(mode == "register" && flag){
      if( $("#passInput").val() == $("#confPassInput").val()){
        // net.register( $("#nickInput").val(), $("#passInput").val() );
      }
      else{
        $("#passInput").css({"border": errorBorder});
        $("#confPassInput").css({"border": errorBorder});
      }
    }

  });

  this.alert = function(text){
    alert(text);
  }

  this.initLobby = function(){
    // Remove focus from login button
    $("#loginButton, #nickInput, #passInput").blur();

    $("#loginDiv").addClass("begone");
    $("#content").removeClass("begone");


    // ============================= Chat stuff ================================
    var greetingMessage = {
      "local": "Connected to localhost",
      "official": "Connected to official server",
      "remote": "Connected to: " + net.currentServer.address
    };
    $("#globalChat").append(
      $("<li>")
        .html( greetingMessage[net.currentServer.type] + ", hello " + $("#nickInput").val() + "." )
        .css( { "font-weight": "bold" } )
    );

    $("#globalChatForm").submit(function(){
      event.preventDefault();

      if( $("#gMessage").val() != "" ){
        socket.emit("gMessage", {'nick': $("#nickInput").val(), 'message': $("#gMessage").val()} );

        $("#globalChat").append(
          $("<li>")
            .html( $("#nickInput").val() + ": " + $("#gMessage").val() )
            .css( { "color": "blue" } )
        );
        ui.scrollToBottom(true);
        $("#gMessage").val("");
      }
    });


    this.scrollToBottom = function(force){
      if($('#globalChat').scrollTop() + $('#globalChat').height() > $('#globalChat')[0].scrollHeight - 40 || force)
        $('#globalChat').animate(
          { 'scrollTop': $('#globalChat')[0].scrollHeight - $('#globalChat').height() },
          100,
          "swing"
        );
    }
    $("#globalChat").on("scroll", function(){
      if($('#globalChat').scrollTop() + $('#globalChat').height() > $('#globalChat')[0].scrollHeight - 40){ // bottom
        $("#globalChatHelper").remove();
      }
      else if($("#globalChatHelper").length < 1){
        $("#globalChat").append(
          $("<div>")
            .html( "-- More messages below --" )
            .prop("id", "globalChatHelper")
            .click(function(){
              $('#globalChat').animate(
                { 'scrollTop': $('#globalChat')[0].scrollHeight - $('#globalChat').height() },
                100,
                "swing"
              );
            })
        );
      }

    }); // ======================= End of Chat stuff ===========================

    // ============================== Lobby stuff ==============================
    $("#newLobby").click(function(){
      ipcRenderer.send("openLobbyCreator");
    });
    ipcRenderer.on("newLobby", function(event, data){
      console.log("sending onto socket - " + data);
      socket.emit("newLobby", data);
    });
    // ====================== End of Lobby stuff ===========================

  } // end of initLobby()



} // end of _ui()
