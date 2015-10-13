'use strict';

angular.module('searches').directive('searchCategory', ['$state',
	function($state) {
		return {
			template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="search-category" viewBox="0 0 500 0" enable-background="new 0 0 80 700" xml:space="preserve">',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				/*global Snap*/
                /*global mina*/
                /*global TweenMax*/
                /*global TimelineMax*/
                /*global Back*/

                var snap = new Snap('#search-category');
                var categories = [];
                var texts = ['Guild', 'User', 'Game', 'Project'];
                var scopeCategory = [scope.guild, scope.user, scope.game, scope.project];
                var lightBackground='#515152', fontColor='#b5b5b5', mainColor='#11dfb1', secondColor='#f77269';

                var Category = function(indice, text){
                    this.selected = false;

                    this.circle = snap.circle(100+indice*100,30,25);
                        this.circle.attr({'fill':lightBackground, 'fillOpacity':0.2, 'stroke':lightBackground});
                    this.text = snap.text(this.circle.getBBox().cx,this.circle.getBBox().cy, text);
                        this.text.attr({'text-anchor':'middle','dominant-baseline':'middle'});
                    this.category = snap.g(this.circle, this.text);
                        this.category.attr({opacity:0, transformOrigin:'50% 50%'});
                        this.category.transform('s0.5,0.5');

                    //In case the user reload the page
                    if(scope.categorySelected.map(function(cat){return cat.position;}).indexOf(indice) !== -1){
                        this.selected = true;
                        this.circle.attr({'stroke':mainColor});
                    }

                    var self = this;

                    this.category.hover(function() {
                        if(self.selected===false){
                            TweenMax.to(self.circle, 0.2, {snap:{strokeWidth:3, strokeOpacity:0.3}});
                        }
                    },function(){
                        if(self.selected===false){
                            TweenMax.to(self.circle, 0.2, {snap:{strokeWidth:1, strokeOpacity:1}});
                        }
                    });

                    this.category.click(function(){
                        if(self.selected === false){
                            self.selected = true;
                            TweenMax.to(self.circle, 0.2, {snap:{stroke:mainColor}});
                            TweenMax.to(angular.element(element.parent()), 0.2, {y:0});
                            $state.go('search.result', {category: angular.lowercase(texts[indice]), position: indice});
                        }else{
                            self.selected = false;
                            TweenMax.to(self.circle, 0.2, {snap:{stroke:fontColor}});
                            scope.categorySelected.splice(scope.categorySelected.map(function(cat){return parseInt(cat.position);}).indexOf(indice),1);

                            $state.go('search.result');
                            scope.$broadcast('removeCategory', {}, {reload : true});
                        }
                    });
                };

                function getSearchEngineDown(){
                    console.log('bob');
                    scope.searchEngineDown = document.getElementsByTagName('search-engine')[0].getBoundingClientRect().top + document.getElementsByTagName('search-engine')[0].getBoundingClientRect().height;
                }

                scope.showCategory = function() {
                    var animateCategories = categories.map(function(cat){return cat.category;});
                    TweenMax.to(snap, 0.1, {snap:{viewBox:'0 0 500 60'}, onComplete: function(){
                        TweenMax.staggerTo(animateCategories, 0.3, {snap:{
                            opacity:1,
                            scale:1
                        }, ease: Back.easeOut.config(2.5)}, 0.1);
                        getSearchEngineDown();
                    }});
                };

                scope.hideCategory = function(callback){
                    var animateCategories = categories.map(function(cat){return cat.category;});
                    TweenMax.staggerTo(animateCategories, 0.3, {snap:{
                        opacity:0,
                        scale:0.1
                    }, ease: Back.easeIn.config(2.5)}, 0.1, function(){
                        TweenMax.to(snap, 0.2, {snap:{viewBox:'0 0 500 0'}});
                        getSearchEngineDown();
                        callback();
                    });

                };


                for(var i=0; i<4; i++){
                    categories[i] = new Category(i, texts[i]);
                }




			}
		};
	}
]);
