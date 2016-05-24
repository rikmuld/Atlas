//Importing neccecities
var express = require('express');
var path = require('path');
var stylus = require('stylus');
var routes = require('./routes');
var socket = require('socket.io');
//Creating server
var app = express();
var server = require('http').Server(app);
var io = socket(server);
//Configuration server
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../views'));
app.use(stylus.middleware(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));
//Setup routings
routes.setup(app, io);
//Starting server
server.listen(3000);
//# sourceMappingURL=server.js.map