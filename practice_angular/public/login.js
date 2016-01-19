(function() {
    'use strict';

    //main, [] dependencies
    angular.module('main')
    .controller('LoginCtrl', ['$scope', '$http', function($scope, $http){
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
    }]);
})();
