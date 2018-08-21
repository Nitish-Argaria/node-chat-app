// [{
// 	id:
// 	name:
// 	room: 
// }]


//addUser(id,name,room)
//removeUser(id)
// getUser(id)
// getUserList(room) 

// var users [];
// var addUser = (id,name,room)=>{
// 	user.push({});
// }

// module.export = {addUser}

class Users {
	constructor () {
		this.users = [];
	}
	addUser (id,name,room) {
		var user = {id,name,room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
		//return user that was removed
		var user = this.getUser(id);
		if(user){
			this.users = this.users.filter((user)=>user.id!== id);
		}
		return user;


	}
	getUser (id) {
		var user = this.users.filter((user)=>user.id === id);
		return user[0];

	}
	getUserList (room){
		//['Mike','Jen','caleb']
		var users = this.users.filter((user)=>user.room===room);
		var namesArray = users.map((user)=>user.name);
		return namesArray;
	}
}

module.exports = {Users};


// class Person{
// 	constructor (name,age){
// 		this.name = name;
// 		this.age = age;

// 	}
// 	getUserDescription() {
// 		return `${this.name} is ${this.age} year(s) old`;
// 	}
// }
// var me = new Person('Nitish',25);
// console.log(me.name,'this.name');
// console.log(me.age,'this.age');
// var description = me.getUserDescription();
// console.log(description);