var expect = require('expect');
var {generateMessage} = require('./message');
describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var from ="Nitish";
		var text= "testing ";
		generateMessage((from,text),(res)=>{
			expect(typeof res.createdAt).toBe('number');
			expect(res).toInclude({
				from,
				text
			});

		});
	});
})