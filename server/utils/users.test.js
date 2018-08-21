const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{

	var users;

	beforeEach(()=>{
		 users = new Users();
		 users.users = [{
		 	id:'1',
		 	name:'Nitish',
		 	room:'Node Course'
		 },{
		 	id:'2',
		 	name:'Shivangi',
		 	room:'Node Course'
		 },{
		 	id:'3',
		 	name:'Puja',
		 	room:'React Course'
		 },{
		 	id:'4',
		 	name:'Rashi',
		 	room:'React Course'
		 }];
	});

	it('should remove a user',()=>{
		var userId = '4'
		var user = users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(3);

	});

	it('should not remove a user',()=>{
		var userId = '99'
		var user = users.removeUser(userId);
		expect(user).toBeFalsy()
		expect(users.users.length).toBe(4);
	});

	it('should find user',()=>{
		var user = users.getUser('1');
		expect(user).toEqual(users.users[0]);
	});

	it('should not find user',()=>{
		var user = users.getUser('5');
		expect(user).toBeFalsy();
	});

	it('should add new user',()=>{
		var users = new Users();
		var user = {
			id: '123',
			name: 'Nitish',
			room:'The office fan'
		};
		var resUser = users.addUser(user.id,user.name,user.room);
		expect(users.users).toEqual([user]);
	});
	it('should return names for node Course',()=>{
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Nitish','Shivangi']);
	});

	it('should return names for react Course',()=>{
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Puja','Rashi']);
	})
});