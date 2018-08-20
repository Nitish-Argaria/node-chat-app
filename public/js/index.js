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

// socket.on('newLocationMessage', function (message) {
// 	//console.log(message); 
// 	var li = jQuery('<li></li>');
// 	var a = jQuery('<a target="_blank">My current location</a>');
// 	//var a = jQuery('<a target="_blank">My Current position</a>');
// 	li.text(`${message.from}: `);
// 	a.attr('href', message.url);
// 	li.append(a);
// 	jQuery('#messages').append(li);

// });
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e) {
	e.preventDefault();

	socket.emit('createMessage',{
		from:'User',
		text:jQuery('[name=message').val()
	},function() {

	});
});



var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by browser');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		console.log(position);
	},function(){
		alert('Unable to fetch location.');
	});
});









