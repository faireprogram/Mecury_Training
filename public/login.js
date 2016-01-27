(function() {

    'use strict';

    angular.module('main')
        .controller('LoginCtrl', ['$scope', '$http', 'LoginService', 'Util',
            function(scope, $http, LoginService, Util) {

                scope.signup = function(user) {
                    var verify = {
                        status: false,
                        activeid: Util.uuid()
                    };
                    user.verify = verify;
                    $http.post('/api/login', user).success(function(user) {
                        if (user.username) {
                            LoginService.signupModal.close({
                                username: user.username,
                                verify: user.verify
                            });
                        }
                    });
                };

                scope.login = function(user) {
                    user.isLogin = true;
                    $http.post('/api/login', user).success(function(info) {
                        if (info.status) {
                            LoginService.loginModal.close({
                                username: info.username,
                                verify: info.verify

                            });
                        }
                        // TODO: show error message in login modal
                    });
                };
            }
        ]);
})();
