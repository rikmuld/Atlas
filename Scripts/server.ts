//Importing neccecities
import express = require('express');
import path = require('path')
import stylus = require('stylus')
import routes = require('./routes')
import socket = require('socket.io')

//Creating server
var app = express()
var server = require('http').Server(app)
var io = socket(server)

//Configuration server
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

//Setup routings
routes.setup(app, io)

//Starting server
server.listen(3000)