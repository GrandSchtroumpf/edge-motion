'use strict';

(function() {
	// Sidemenus Controller Spec
	describe('Sidemenus Controller Tests', function() {
		// Initialize global variables
		var SidemenusController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Sidemenus controller.
			SidemenusController = $controller('SidemenusController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sidemenu object fetched from XHR', inject(function(Sidemenus) {
			// Create sample Sidemenu using the Sidemenus service
			var sampleSidemenu = new Sidemenus({
				name: 'New Sidemenu'
			});

			// Create a sample Sidemenus array that includes the new Sidemenu
			var sampleSidemenus = [sampleSidemenu];

			// Set GET response
			$httpBackend.expectGET('api/sidemenus').respond(sampleSidemenus);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sidemenus).toEqualData(sampleSidemenus);
		}));

		it('$scope.findOne() should create an array with one Sidemenu object fetched from XHR using a sidemenuId URL parameter', inject(function(Sidemenus) {
			// Define a sample Sidemenu object
			var sampleSidemenu = new Sidemenus({
				name: 'New Sidemenu'
			});

			// Set the URL parameter
			$stateParams.sidemenuId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/sidemenus\/([0-9a-fA-F]{24})$/).respond(sampleSidemenu);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.sidemenu).toEqualData(sampleSidemenu);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Sidemenus) {
			// Create a sample Sidemenu object
			var sampleSidemenuPostData = new Sidemenus({
				name: 'New Sidemenu'
			});

			// Create a sample Sidemenu response
			var sampleSidemenuResponse = new Sidemenus({
				_id: '525cf20451979dea2c000001',
				name: 'New Sidemenu'
			});

			// Fixture mock form input values
			scope.name = 'New Sidemenu';

			// Set POST response
			$httpBackend.expectPOST('api/sidemenus', sampleSidemenuPostData).respond(sampleSidemenuResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sidemenu was created
			expect($location.path()).toBe('/sidemenus/' + sampleSidemenuResponse._id);
		}));

		it('$scope.update() should update a valid Sidemenu', inject(function(Sidemenus) {
			// Define a sample Sidemenu put data
			var sampleSidemenuPutData = new Sidemenus({
				_id: '525cf20451979dea2c000001',
				name: 'New Sidemenu'
			});

			// Mock Sidemenu in scope
			scope.sidemenu = sampleSidemenuPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/sidemenus\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sidemenus/' + sampleSidemenuPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid sidemenuId and remove the Sidemenu from the scope', inject(function(Sidemenus) {
			// Create new Sidemenu object
			var sampleSidemenu = new Sidemenus({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sidemenus array and include the Sidemenu
			scope.sidemenus = [sampleSidemenu];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/sidemenus\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSidemenu);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.sidemenus.length).toBe(0);
		}));
	});
}());