'use strict';

angular.module('sidemenus').directive('sidebarHeadConnexion', ['$compile',
	function($compile) {
		return {
			restrict: 'AEC',
            controller : function($scope, $element, $attrs){
                $scope.username='username';
                $scope.password='word';
            },
			link: function postLink(scope, element, attrs) {

                /*
                    Variables
                 */
                /*global Snap*/
                /*global mina*/
                var sidebar = scope.sidebar;
                var wrapper = document.getElementById('wrapper');

                //Theme color
                var loginColor=scope.colors.buttonColor, mainColor=scope.colors.mainColor, secondColor=scope.colors.secondColor;
                var formGradient = sidebar.gradient('l(0,0,1,1)'+loginColor+'-'+secondColor);
                var loginGradient = sidebar.gradient('l(0,0,1,1)'+loginColor+'-'+mainColor);

                //Login
                var login_circle, locker_rect, locker_ellipse, locker, login, loginMatrix;
                var large_login_circle, large_login_circleMatrix;
                var loginX=40, loginY=40, loginR=30;


                //Form
                var submitRect, submitText, submitButton;
                var submitRectWidth=160, submitRectHeight=30, submitRectX=loginX-(submitRectWidth/2), submitRectY=loginY+50;
                var formText, formTextTitle=['Username', 'Password', 'Submit'];
                var input;
                var formTextX=loginX-50, formTextY=submitRectY+70;

                //Form Button
                var formButton=[], formButtonMatrix=[];
                var nextButton, previousButton;
                var signUpCircle, signUpText, signUpButton;



                scope.inputStyle={
                    backgroundColor:'rgb(35,42,52)',
                    color:mainColor,
                    border: '1px solid '+loginColor,
                    width:submitRectWidth+'px',
                    height:submitRectHeight+'px',
                    position:'fixed',
                    left:'20px',
                    top:'90px'
                };

                /*
                 Resize
                 */
                scope.sidebarOpened.toggleHead = function(){
                    //Close
                    if(scope.sidebarOpened.status===false){
                        resizeLoginButton();
                        resizeForm();
                        resizeLogin();
                        removeInput();
                        deleteSignUp();
                    }else{
                        //Open
                        resizeLogin(function(){
                            resizeForm();
                            resizeLoginButton();
                            setTimeout(function(){
                                //initSignUp();
                            },300);
                        });
                    }
                };

                /*
                 LOGIN LOCKER
                 */
                /*jshint latedef: nofunc */
                initLogin();
                function initLogin(){

                    large_login_circle = sidebar.circle(loginX, loginY, loginR+5);
                    large_login_circle.attr({'fill': 'none', 'stroke': loginGradient});
                    var large_login_circleCx = large_login_circle.getBBox().cx;
                    var large_login_circleCy = large_login_circle.getBBox().cy;

                    login_circle = sidebar.circle(loginX,loginY,loginR);
                    login_circle.attr({'fill':loginColor, 'stroke':loginColor});
                    locker_rect = sidebar.rect(25,35,30,25);
                    locker_rect.attr({'fill':mainColor});
                    locker_ellipse = sidebar.path('M27.5,42.3V31.9c0-6.6,5.4-12,12-12h1c6.6,0,12,5.4,12,12v3.2');
                    locker_ellipse.attr({'fill':'none', 'stroke':mainColor, 'strokeWidth':'3px'});
                    locker = sidebar.g(locker_ellipse,locker_rect);
                    login = sidebar.g(login_circle, locker);

                    large_login_circleMatrix = new Snap.Matrix();
                    large_login_circleMatrix.translate(0,0);
                    large_login_circleMatrix.scale(4.2,4.2,large_login_circleCx,large_login_circleCy);

                    login.hover(function(){
                        openLocker();
                    }, function(){
                        closeLocker();
                    });
                    login.click(scope.toggleSidebarOppened);
                }


                function openLocker(){
                    locker_ellipse.animate({'d':'M27.5,36.3V25.9c0-6.6,5.4-12,12-12h1c6.6,0,12,5.4,12,12v3.2'}, 200);
                }
                function closeLocker(){
                    locker_ellipse.animate({'d':'M27.5,42.3V31.9c0-6.6,5.4-12,12-12h1c6.6,0,12,5.4,12,12v3.2'}, 200);
                }
                function resizeLogin(callback){
                    if(scope.sidebarOpened.status===true){
                        setTimeout(function(){
                            login_circle.animate({'strokeOpacity':0.3, 'strokeWidth':15}, 200);
                            large_login_circle.animate({transform: large_login_circleMatrix}, 600, mina.easein, function() {
                                if(callback){callback();}
                            });
                        },500);
                    } else{
                        login_circle.animate({'stroke-opacity':1, 'stroke-width':1}, 200);
                        large_login_circle.animate({transform: large_login_circleMatrix.invert}, 400);
                    }
                }


                /*
                 FORM TEXT
                 */
                function resizeForm(){
                    if(scope.sidebarOpened.status===true){
                        initForm();
                    }else{
                        deleteForm();
                    }
                }

                function initForm(){
                    //Submit Button
                    submitRect = sidebar.rect(submitRectX, submitRectY, submitRectWidth, submitRectHeight);
                    submitRect.attr({'fill':'rgb(35,42,52)', 'stroke':mainColor, 'strokeWidth':2});
                    submitText = sidebar.text(submitRectX+submitRectWidth/2, submitRectY+submitRectHeight/2+5,'Submit');
                    submitText.attr({'fill':mainColor, 'text-anchor':'middle', 'font-size':20});
                    submitButton = sidebar.g(submitRect, submitText);
                    submitButton.attr({'opacity':0});

                    //Form text
                    formText = sidebar.text(submitRectX, submitRectY+20);
                    formText.attr({'font-family':'Arial', 'font-size':20,'fill':mainColor, 'stroke':mainColor, 'strokeOpacity':0.2});

                    for(var i=0;i<formTextTitle.length;i++){
                        formText[i] = sidebar.text(formTextX+i*100, formTextY, formTextTitle[i]);
                        formText[i].attr({'text-anchor':'center', 'font-family':'Arial', 'font-size':20, 'fill':loginColor, 'opacity':0});
                    }
                    formText[0].attr({'opacity':1});
                    changeInput('username');
                }

                function deleteForm(){
                    submitRect.remove();
                    for(var i=0;i<formTextTitle.length;i++){
                        formText[i].remove();
                        submitButton.remove();
                    }
                }

                function changeInput(model, type){
                    removeInput();
                    var template ='<input type="'+type+'" data-ng-models="'+model+'" ng-style="inputStyle">';
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    element.append(content);
                }
                function removeInput(){
                    if(element[0].children[1]){
                        element[0].children[1].remove();
                    }
                }


                function nextTitle(indice){
                    for(var i=0;i<formTextTitle.length;i++){
                        formText[i].animate({transform:'t-'+100*(indice+1)+',0'},300, mina.bounce);
                    }
                    formText[indice].animate({'opacity':0},300);
                    formText[indice+1].animate({'opacity':1},300);
                }
                function previousTitle(indice){
                    for(var i=0;i<formTextTitle.length;i++){
                        formText[i].animate({transform:'t'+100*(1-indice)+',0'},300, mina.bounce);
                    }
                    formText[indice].animate({'opacity':0},300);
                    formText[indice-1].animate({'opacity':1},300);
                }



                /*
                 Login Button
                 */
                function resizeLoginButton(){
                    if(scope.sidebarOpened.status===true){
                        initLoginButton();
                    }else{
                        deleteLoginButton();
                    }
                }

                function nextForm(indice){
                    for(var i=0; i<formTextTitle.length; i++){
                        var newMatrix = [];
                        newMatrix[i] = new Snap.Matrix();
                        newMatrix[i].rotate((indice+1-i)*180/8, loginX, loginY).translate(0, loginY+(loginR-4)*4);
                        formButton[i].animate({transform : newMatrix[i]}, 200+i*200, mina.bounce);
                    }
                    formButton[indice].attr({'fill':loginGradient, 'stroke':loginGradient});
                    if(indice===0){changeInput('password','password');}
                    if(indice===1){
                        removeInput();
                        submitButton.attr({'opacity':1});
                    }

                }
                function previousForm(indice){
                    for(var i=0; i<formTextTitle.length; i++){
                        var newMatrix = [];
                        newMatrix[i] = new Snap.Matrix();
                        newMatrix[i].rotate((indice-1-i)*180/8, loginX, loginY).translate(0, loginY+(loginR-4)*4);
                        formButton[i].animate({transform : newMatrix[i]}, 200+i*200, mina.bounce);
                    }
                    formButton[indice-1].attr({'fill':secondColor, 'stroke':secondColor});
                    if(indice===1){changeInput('username', 'text');}
                    else if(indice===2){changeInput('password', 'password');}
                    else if(indice===3){
                        removeInput();
                        submitButton.attr({'opacity':0});
                    }
                }

                function initLoginButton(){
                    for(var i=0; i<formTextTitle.length; i++){
                        formButton[i] = sidebar.circle(loginX, loginY, 10);
                        formButton[i].attr({'fill' : secondColor, 'stroke': secondColor, 'strokeOpacity':0.2, 'strokeWidth':10});
                        formButtonMatrix[i] = new Snap.Matrix();
                        formButtonMatrix[i].rotate(-i*180/8, loginX, loginY).translate(0, loginY+(loginR-4)*4);
                        formButton[i].animate({transform : formButtonMatrix[i]}, 200+i*200, mina.bounce);
                    }
                    nextButton = sidebar.circle(loginX+loginR+30, loginY, 10);
                    nextButton.attr({'fill':loginColor});
                    previousButton = sidebar.circle(loginX-loginR-30, loginY,10);
                    previousButton.attr({'fill':loginColor});

                    var formIndice = 0;
                    nextButton.click(function(){
                        if(formIndice<formTextTitle.length-1){
                            nextTitle(formIndice);
                            nextForm(formIndice);
                            formIndice++;
                        }

                    });
                    previousButton.click(function(){
                        if(formIndice>0){
                            previousTitle(formIndice);
                            previousForm(formIndice);
                            formIndice--;
                        }
                    });
                }

                function deleteLoginButton(){
                    for(var i=0; i<formTextTitle.length; i++){
                        formButton[i].remove();
                    }
                }

                /*
                 SIGN-UP
                 */
                function initSignUp(){
                    signUpText = sidebar.text(loginX-5, loginY, ['Sign','Up']);
                    signUpText.selectAll('tspan').forEach(function(tspan, i){
                        tspan.attr({x:loginX-13+i*3, y:loginY+ 14*i});
                    });
                    signUpCircle = sidebar.circle(loginX, loginY, 20);
                    signUpCircle.attr({'fill':loginGradient, 'stroke':loginGradient, 'strokeOpacity':0.2, 'strokeWidth':15});
                    signUpButton = sidebar.g(signUpCircle,signUpText);
                    signUpButton.animate({transform : 't0,200'}, 300);
                }

                function deleteSignUp(){
                    signUpButton.animate({transform: 't0,0'}, 100, mina.easein, function(){
                        signUpButton.remove();
                    });
                }


                element.on('$destroy', function(){
                    large_login_circle.remove();
                    locker.remove();
                    login.remove();
                });

			}
		};
	}
]);
