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

  // REST API
  app.post('/api/next', function (req, res) {
    io.emit('next');
    res.sendStatus(200)
  })

  app.post('/api/playpause', function (req, res) {
    io.emit('playpause');
    res.sendStatus(200)
  })

  app.post('/api/prev', function (req, res) {
    io.emit('prev');
    res.sendStatus(200)
  })

  app.post('/api/searchplay', function (req, res) {
    io.emit('searchplay', {
      query: req.query.query
    });
    res.sendStatus(200)
  })

});

http.listen(1337);
