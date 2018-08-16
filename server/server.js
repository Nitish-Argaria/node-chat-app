const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'/../public');
//console.log(__dirname+'/../public');
//console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log('New user connected');

	socket.on('disconnect',()=>{
		console.log('Client disconnected');
	})

});

// app.get('/',(req,res)=>{
// 	res.render('./../public/index.html');
// });


server.listen(port,()=>{
	console.log(`app has been started on ${port}`);
});



