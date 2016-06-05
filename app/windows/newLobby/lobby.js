window.$ = window.jQuery = require("jquery");
const {ipcRenderer, remote} = require('electron');

$(document).ready( () => {
  $("input[name='type']").change(()=>{
    if($("#privateMode").is(":checked"))
      $('#lobbyPassword').prop("disabled", false);
    else{
      $('#lobbyPassword').val("");
      $('#lobbyPassword').prop("disabled", true);
    }
  });

  $("#newLobbyForm").submit(function(){
    event.preventDefault();
    var lobby = {
      name: $('#lobbyName').val(),
      type: $("#privateMode").is(":checked") ? "private" : "public",
      password: $('#lobbyPassword').val()
    };
    // console.log(lobby)
    ipcRenderer.send('newLobby', lobby);
  });
});
