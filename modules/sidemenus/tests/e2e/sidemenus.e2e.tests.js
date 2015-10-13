'use strict';

describe('Sidemenus E2E Tests:', function() {
	describe('Test Sidemenus page', function() {
		it('Should not include new Sidemenus', function() {
			browser.get('http://localhost:3000/#!/sidemenus');
			expect(element.all(by.repeater('sidemenu in sidemenus')).count()).toEqual(0);
		});
	});
});
