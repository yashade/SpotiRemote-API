var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('internal_next', function() {
    io.emit('next');
  });

  socket.on('internal_playpause', function() {
    io.emit('playpause');
  });

  socket.on('internal_prev', function() {
    io.emit('prev');
  });

  socket.on('internal_searchplay', function(data){
    io.emit('searchplay', {
      query: data
    });
  });
});

http.listen(1337, function() {
  console.log('listening on *:1337');
});
