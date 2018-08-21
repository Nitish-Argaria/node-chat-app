var socket = io();


function scrollToBottom () {
	//selectos
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');
	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();
	if(clientHeight+scrollTop +newMessageHeight+ lastMessageHeight >= scrollHeight)
	{
		messages.scrollTop(scrollHeight);
	}

}



socket.on('connect',function(argument) {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join',params,function (err) {
		if(err)
		{
			alert(err);
			window.location.href = '/';

		}
		else{
			console.log('No error');
		}
	});
	// socket.emit('createMessage',{
	// 	from:"shivangi",
	// 	text:"hi "
	// });
});

socket.on('disconnect',function(){
	console.log('Disconnected from server');
});

socket.on('updateUserList',function(users) {
	console.log('User list',users);
	var ul =jQuery('<ul></ul>');
	users.forEach(function(user){
		ul.append(jQuery('<li></li>').text(user));

	});
	jQuery('#users').html(ul);
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
	scrollToBottom();
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
  scrollToBottom();
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









