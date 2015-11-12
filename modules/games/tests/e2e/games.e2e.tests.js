'use strict';

describe('Games E2E Tests:', function() {
	describe('Test Games page', function() {
		it('Should not include new Games', function() {
			browser.get('http://localhost:3000/#!/games');
			expect(element.all(by.repeater('game in games')).count()).toEqual(0);
		});
	});
});
