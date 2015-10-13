'use strict';

describe('Sidebars E2E Tests:', function() {
	describe('Test Sidebars page', function() {
		it('Should not include new Sidebars', function() {
			browser.get('http://localhost:3000/#!/sidebars');
			expect(element.all(by.repeater('sidebar in sidebars')).count()).toEqual(0);
		});
	});
});
