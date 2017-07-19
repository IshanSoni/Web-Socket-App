var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

var play = false;
var time = 0;
io.on('connection', function(socket) {
  console.log('user connected');
  socket.emit('play-pause-video', play);
  socket.emit('update-time', time);

  socket.on('play-pause-video', function(curPlay) {
    play = curPlay;
    io.emit('play-pause-video', curPlay);
  });

  socket.on('update-time', function(curTime) {
    time = curTime;
    io.emit('update-time', curTime);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});