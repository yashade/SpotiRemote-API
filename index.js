var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 1337;

app.post('/api/next', function (req, res) {
  io.emit('next');
  io.emit('metadatachanged');
  res.sendStatus(200);
});

app.post('/api/playpause', function (req, res) {
  io.emit('playpause');
  io.emit('metadatachanged');
  res.sendStatus(200);
});

app.post('/api/prev', function (req, res) {
  io.emit('prev');
  io.emit('metadatachanged');
  res.sendStatus(200);
});

app.post('/api/searchplay', function (req, res) {
  io.emit('searchplay', {
    query: req.query.query
  });
  io.emit('metadatachanged');
  res.sendStatus(200);
});

app.post('/api/setvolume', function (req, res) {
  io.emit('setvolume', {
    level: req.query.level
  });
  res.sendStatus(200);
});

app.post('/api/share', function (req, res) {
  io.emit('share', {
    track: req.query.track
  });
  io.emit('metadatachanged');
  res.sendStatus(200);
});

// metadata
var track;
var artist;
var album;
var albumcover;

app.post('/api/metadata', function (req, res) {
  track = req.query.track;
  artist = req.query.artist;
  album = req.query.album;
  albumcover = req.query.albumcover;

  io.emit('metadatachanged');
  res.sendStatus(200);
});

app.get('/api/metadata', function (req, res) {
  res.json({
    track: track,
    artist: artist,
    album: album,
    albumcover: albumcover
  });
});

http.listen(port);
