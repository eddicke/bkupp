var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var oldMsg = []
var spawn;    
            
io.on('connection', function(socket) {
  io.emit("oldMsg", oldMsg);
   io.broadcast.emit("newplayer", spawn);
  socket.on('chat', function(username, message) {
    console.log('message received, sent by: ' + username + ', content: ' + message);
   // oldMsg.push('message received, sent by: ' + username + ', content: ' + message);
    io.emit('chat', username, message);
  });
 socket.on('ademola', function(gme){
    io.emit('ademola', gme);
  });
socket.on('control', function(player){
    io.emit('control', player);
  });
  socket.on('player', function(spawn){
    io.emit('player', spawn);
  });
  
  //broadcast alert messages to all users!
  socket.on('broadcast', function(msg){
    io.emit('broadcast', msg);
  });
 socket.on('hunts', function(me){
    io.emit('hunts', me);
  });

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
