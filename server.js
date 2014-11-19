'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');


// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jshtml');

app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('your secret here'));

app.use(express.static(path.join(__dirname, 'public')));

//app.engine('jshtml', require('jshtml-express'));
//app.set('view engine', 'jshtml');

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.get('/', function(req, res) {
    // res.sendFile('/public/index.html')
    res.sendFile('/client/app/index.html');
});

app.get('/api/streams',function(req,res){
	res.sendFile('/streams.json',{root:'.'});
});

app.get('/api/sound/pause',function(req,res){
	io.sockets.emit('sound:server:pause',{uid:'02cd816a2b654f59282e2476384488df'});
	res.json({uid:'02cd816a2b654f59282e2476384488df'});
});
/*
* volume is a int between 0 and 100
*/
app.get('/api/sound/volume/:volume',function(req,res){
	var data = {
		volume:req.params.volume,
		uid:'02cd816a2b654f59282e2476384488df'
	};
	
	io.sockets.emit('sound:server:volume',data);
	res.json(data);
});

/**
* progress is a int representing the time of the song in miliseconds
*/
app.get('/api/sound/progress/:progress',function(req,res){
	var data = {
		progress:req.params.progress,
		uid:'02cd816a2b654f59282e2476384488df'
	};
	io.sockets.emit('sound:server:progress', data);
	res.json(data);
});


var server = app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server)

io.sockets.on('connection', function () {
    console.log('connected');
});

module.exports = app;
