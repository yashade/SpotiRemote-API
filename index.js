var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.post('/api/next', function (req, res) {
  io.emit('next');
  res.sendStatus(200);
});

app.post('/api/playpause', function (req, res) {
  io.emit('playpause');
  res.sendStatus(200);
});

app.post('/api/prev', function (req, res) {
  io.emit('prev');
  res.sendStatus(200);
});

app.post('/api/searchplay', function (req, res) {
  io.emit('searchplay', {
    query: req.query.query
  });
  res.sendStatus(200);
});

app.post('/api/setvolume', function (req, res) {
  io.emit('setvolume', {
    level: req.query.level
  });
  res.sendStatus(200);
});

http.listen(1337);
