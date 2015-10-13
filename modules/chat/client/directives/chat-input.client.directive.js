'use strict';

angular.module('chat').directive('chatInput', [
	function() {
		return {
			template: '<input ng-models="message">',
			restrict: 'E',
			controller:function($scope, $element){
                $scope.message = '';
            },

            link: function postLink(scope, element, attrs) {
                var htmlContent = '';
                var newLines = [];
                var compareString;

				scope.$watch('message', function(newValue, oldValue){
                    compareString = compareMessage(newValue, oldValue);
                }, true);

                //keyboard events
                element.on('keydown keypress', function(event){
                    if(event.which === 13 || event.keyCode === 13){
                        //event shift+enter
                        if(event.shiftKey === true){
                            newLines.push(scope.message.length);
                            console.log(newLines);
                            event.preventDefault();
                        //event enter
                        }else{
                            sendMessage();
                            event.preventDefault();
                        }
                    }
                    //event backspace or delete
                    else if(event.which === 8 || event.keyCode === 8 || event.which === 46 || event.keyCode === 46){
                        if(newLines.indexOf(compareString) !== -1){
                            newLines.splice(newLines[compareString], 1);
                        }
                        for(var i=0; i<newLines.length; i++){
                            if(newLines[i]>compareString){
                                newLines[i]--;
                            }
                        }
                    }
                });


                function sendMessage(){
                    var content = '<p>'+scope.message.replace(/\r?\n/g, '<br />')+'</p>';
                    console.log(content);
                }

                function compareMessage(newValue, oldValue){
                    if(newValue > oldValue){    //If we had text do nothing
                        return -1;
                    }
                    else{                       //If we retrieve text, return retrieved place
                        var minLen = Math.min(newValue.length,oldValue.length);
                        for(var i = 0; i<minLen; i++) {
                            if(oldValue.charAt(i) !== oldValue.charAt(i)) {
                                return i;
                            }
                        }
                        return minLen;
                    }
                }

                scope.$on('$destroy', function() {
                    element.removeListener('keydown');
                });
			}
		};
	}
]);
