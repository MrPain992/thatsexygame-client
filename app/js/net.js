function Net(){
  socket.emit("test", "derp");
  socket.on("test", function(data){
    console.log("test: " + data);
  });
}
