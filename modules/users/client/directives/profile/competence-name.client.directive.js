'use strict';

angular.module('users').directive('competenceName', [
	function() {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				/*global TweenMax*/
				/*global TimelineMax*/
                var mainColor = '#11dfb1';
                var colors = {left : 'rgba(#000000,1', right:'rgba(#000000,0'};

                function colorize(element) {
                    //apply the colors to the element
                    TweenMax.set(element, {backgroundColor:
                    '-moz-linear-gradient(top,' + colors.top + ', ' + colors.bottom + ')'
                        //"-moz-linear-gradient(top," + colors.top + ", " + colors.bottom + "),"+
                        //"-ms-linear-gradient(top," + colors.top + ", " + colors.bottom + "),"+
                        //"-o-linear-gradient(top," + colors.top + ", " + colors.bottom + ")"
                    });
                }

                var tm=new TimelineMax();
                tm.to(element[0], 0.1, {paddingLeft : '+=20px'});
                tm.to(colors, 0.1, {colorProps:{
                    left : 'rgba('+mainColor+',1',
                    right:'rgba('+mainColor+',0'
                },
                    paused:true,
                    onUpdate:colorize,
                    onUpdateParams:element[0]
                });
                tm.stop();

                element.on('mouseover', function(){
                    tm.play();
                });
                element.on('mouseout', function(){
                    tm.reverse();
                });



			}
		};
	}
]);
