var socket = io();
socket.on('connect',function(argument) {
	// body...

	console.log('Connected to server');
	socket.emit('createEmail',{
		to: 'nitish@gmail.com',
		text: 'Hey this is Nitish'
	});
	// socket.emit('createMessage',{
	// 	from:"shivangi",
	// 	text:"hi "
	// });
});

socket.on('disconnect',function(){
	console.log('Disconnected from server');
});
socket.on('newMessage',function(message){
	console.log("Got new message",message);
})