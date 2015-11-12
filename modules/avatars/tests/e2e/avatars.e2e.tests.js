'use strict';

describe('Avatars E2E Tests:', function() {
	describe('Test Avatars page', function() {
		it('Should not include new Avatars', function() {
			browser.get('http://localhost:3000/#!/avatars');
			expect(element.all(by.repeater('avatar in avatars')).count()).toEqual(0);
		});
	});
});
