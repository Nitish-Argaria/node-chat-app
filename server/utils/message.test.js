var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');
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
describe('generateLocationMessage',()=>{
	it('should generate correct  location object',()=>{
		var from = 'Nitish';
		var latitude = '1';
		var longitude = '2';

		generateLocationMessage((from,latitude,longitude),(res)=>{
			expect(res.from).toBe(from);
			expect(typeof res.createdAt).toBe('number');
			expect(res.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
		})

	});
})