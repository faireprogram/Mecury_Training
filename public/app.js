(function() {
    'use strict';

    angular.module('main', ['ui.bootstrap'])
        .service('LoginService', function($http) {
            var self = this;
            self.getUser = function() {
                return $http.get('/api/login')
            }
            self.logout = function() {
                return $http.get('/api/login/logout')
            }
        }).service('Util', function() {
            var self = this;
            self.uuid = function() {
                function s4() {
                  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                }
                return s4() + s4() + s4() + s4()  + s4();
            }
            self.status = function(st) {
                if(st) {
                    return "Activated";
                } else {
                    return "UnActivate";
                }
            }
        }).controller('UserCtrl', function($scope, $http, $uibModal, LoginService) {
            var self = this;

            LoginService.getUser().success(function(data) {
                // if use then, the username should be like
                // data.data.username
                self.username = data.username;
                self.verify = data.verify;
            })

            self.logout = function() {
                LoginService.logout().then(function() {
                    delete self.username
                });
            }

            $http.get('/api/user').success(function(data) {
                self.users = {};
                data.forEach(function(user) {
                    self.users[user._id] = user;
                });
            })

            self.add = function(user) {
                delete user._id;
                $http.post('/api/user', user).success(function(data) {
                    self.users[data.user._id] = data.user;
                });
            };

            self.selectUser = function(user) {
                self.newUser = angular.copy(user);
            }

            self.updateUser = function(user) {
                $http.put('/api/user', user).success(function(data) {
                    self.users[data.user._id] = data.user;
                });
            };

            self.del = function(uid) {
                $http.delete('/api/user/' + uid).success(function() {
                    delete self.users[uid];
                });
            }

            self.openLoginForm = function() {
                LoginService.loginModal = $uibModal.open({
                    templateUrl: 'login.html',
                    controller: 'LoginCtrl',
                });
                LoginService.loginModal.result.then(function(data){
                    self.username = data.username
                    if(data.verify) {
                        self.activeStatus = "Activated";
                    } else {
                        self.activeStatus = "UnActivate";
                    }
                })
            };

            self.openSignUpForm = function() {
                LoginService.signupModal = $uibModal.open({
                    templateUrl: 'signup.html',
                    controller: 'LoginCtrl',
                });
                LoginService.signupModal.result.then(function(data){
                    self.username = data.username
                    if(data.verify) {
                        self.activeStatus = "Activated";
                    } else {
                        self.activeStatus = "UnActivate";
                    }

                })
            };

        });

})()
