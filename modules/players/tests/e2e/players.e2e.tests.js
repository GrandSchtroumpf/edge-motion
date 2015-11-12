'use strict';

describe('Players E2E Tests:', function() {
	describe('Test Players page', function() {
		it('Should not include new Players', function() {
			browser.get('http://localhost:3000/#!/players');
			expect(element.all(by.repeater('player in players')).count()).toEqual(0);
		});
	});
});
