(function() {
    'use strict';

    //main, [] dependencies
    angular.module('main')
    .controller('LoginCtrl', ['$scope', '$http', function($scope, $http){
        $scope.isLogin = function() {
            $http.get('/api/login').success(function(info) {
               $scope.username = info.username;
            });
        };
        $scope.isLogin();

        $scope.signup = function(user) {
            $http.post('/api/login', user).success(function(user) {
                $scope.username = user.name;
            });
        }

        $scope.login = function(user) {
            user.isLogin = true;
            $http.post('/api/login', user).success(function(info) {
                if(info.status) {
                    $scope.username = user.name;
                }
            });
        }

        $scope.loginout = function() {
            $http.get('/api/login/logout').success(function() {
               delete $scope.username; 
            }) 
        }
    }]);
})();
