'use strict';

angular.module('core').directive('profileResumeEdit', [
	function() {
		return {
			templateUrl: 'modules/users/views/profile/profile-resume/profile-resume-edit.client.view.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.step = 1;

                scope.competencies = [{name : 'bob', level : 2}, {name : 'mari', level : 3}];

                /*
                    Query for competencies
                 */
                scope.selectedItem = null;
                scope.searchText = null;
                scope.transformChip = function(chip) {
                    // If it is an object, it's already a known chip
                    if (angular.isObject(chip)) {
                        return chip;
                    }
                    // Otherwise, create a new one
                    return { name: chip};
                };
                scope.querySearch = function(query) {
                    //var results = query ? scope.user.profile.competencies.filter(createFilterFor(query)) : [];
                    var results = query ? scope.competencies.filter(createFilterFor(query)) : [];
                    console.log(results);
                    return results;
                };
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(competence) {
                        return (competence.name.indexOf(lowercaseQuery) === 0);
                    };
                }


                scope.changeStep = function(number){
                    scope.step = scope.step + number;
                    if(scope.step < 1){
                        scope.step = 2;
                    }else if(scope.step > 2){
                        scope.step = 1;
                    }
                };
			}
		};
	}
]);
