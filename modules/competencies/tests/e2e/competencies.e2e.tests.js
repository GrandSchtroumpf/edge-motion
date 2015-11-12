'use strict';

describe('Competencies E2E Tests:', function() {
	describe('Test Competencies page', function() {
		it('Should not include new Competencies', function() {
			browser.get('http://localhost:3000/#!/competencies');
			expect(element.all(by.repeater('competency in competencies')).count()).toEqual(0);
		});
	});
});
