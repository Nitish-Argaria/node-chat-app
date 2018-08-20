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
	 var formatedTime = moment(message.createdAt).format('h:mm a');
	// console.log("Got new message",message);
	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formatedTime} :${message.text}`);
	// jQuery('#messages').append(li);
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template,{
		text:message.text,
		from:message.from,
		createdAt:formatedTime
	});
	jQuery('#messages').append(html);
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
  var formatedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');

  // li.text(`${message.from}: `);
  // a.attr('href', message.url);
  // li.append(formatedTime);
  // li.append(a);
  // jQuery('#messages').append(li);
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
  	from:message.from,
  	createdAt:formatedTime,
  	url:message.url
  });
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit',function(e) {
	e.preventDefault();

	var messageTextbox=jQuery('[name=message]');

	socket.emit('createMessage',{
		from:'User',
		text:messageTextbox.val()
	},function() {
		messageTextbox.val('');
	});
});



var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by browser');
	}

	locationButton.attr('disabled','disabled').text('Sending location...');


	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		console.log(position);
	},function(){
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});









