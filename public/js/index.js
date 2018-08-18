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
	var li = jQuery('<li></li>');
	li.text(`${message.from}:${message.text}`);
	jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
// 	from:'Frank',
// 	text:'Hi'
// },function (data) {
// 	console.log('Got it',data);
// });

//jQuery('#message-form')
jQuery('#message-form').on('submit',function(e) {
	e.preventDefault();

	socket.emit('createMessage',{
		from:'User',
		text:jQuery('[name=message').val()
	},function() {

	});
});