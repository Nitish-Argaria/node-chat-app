const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{
	it('should reject non-string values',()=>{
		var name = "";
		var room = "";
		expect(isRealString(name)).toBeFalsy();
	});
	it('should reject string with only spaces',()=>{
		var name ="   ";
		var room ="  ";
		expect(isRealString(room)).toBeFalsy();
	});
	it('should allow string with non-space characters',()=>{

		var name = "  lotr ";
		var room = " that will do. it";
		expect(isRealString(room)).toBeTruthy();
	});
});
