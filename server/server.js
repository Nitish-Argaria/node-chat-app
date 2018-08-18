const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'/../public');
//console.log(__dirname+'/../public');
//console.log(publicPath);
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',function(socket){
	console.log('New user connected');

	socket.on('disconnect',function(){
		console.log('Client disconnected');
	});

	// socket.emit('newEmail',{
	// 	from: 'mike@example.com',
	// 	text: 'Hey. what is going on',
	// 	createdAt: 123
	// });
	socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
	socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

	socket.on('createMessage',(message,callback)=>{
		console.log('createMessage',message);
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback('This is from server');
		// socket.broadcast.emit('newMessage',{
		// 	from:message.from,
		// 	text:message.text,
		// 	createdAt: new Date().getTime()
		// });
	});
	// socket.emit('newMessage',{
	// 	from:"Nitish",
	// 	text: "Hello",
	// 	createdAt:123123
	// })

});

// app.get('/',(req,res)=>{
// 	res.render('./../public/index.html');
// });


server.listen(port,()=>{
	console.log(`app has been started on ${port}`);
});



