var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

require('./config/middleware.js')(app, express);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(port);
console.log('heeelllloo!')

var storage = {};

io.on('connection', function (socket) {
  socket.on('init', function (data) {
    socket.join('/'+data);
    storage[data] = {};
    socket.on('userData', function (info) {
      console.log(info);
      storage[data][info.id] = info;
      socket.emit('serverData', storage[data]);
    });
    socket.on('logout', function (info) {
      delete storage[data][info];
      socket.leave('/'+data);
      socket.emit('serverData', storage[data]);
    })
    socket.on('msg', function (info) {
      socket.emit('message', info);
    })
  });
});

module.exports = app;
