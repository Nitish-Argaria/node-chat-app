// Jan 1st 1970 00:00:00 

// In Java script timestamp is in mili second.  so 1000 is 1 second
var moment = require('moment');

// var date = new Date()
// var months = ['Jan','Feb','March']
// console.log(date.getMonth());

// var date = moment();
// date.add(100,'year').subtract(9,'months')
// console.log(date.format('MMM Do YYYY HH:mm:ss'));
//new Date.getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var date = moment(createdAt);
//10:35 am
console.log(date.format('h:mm a'))
//learning git

//git change through nitish and after that updating
