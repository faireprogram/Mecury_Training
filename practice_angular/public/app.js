(function() {
    'use strict';

    angular.module('main', [])
        .controller('UserCtrl', ['$scope', '$http', '$location',
            function($scope, $http, $location) {
                $scope.url = $location.search();
                console.log($scope.url);
                $http.get('/api/user').success(function(data) {
                    $scope.users = {};
                    data.forEach(function(user) {
                        $scope.users[user._id] = user;
                    })
                });

                $scope.selectUser = function(user) {
                    $scope.newUser = angular.copy(user);
                }

                $scope.add = function(user) {
                    delete user._id;
                    $http.post('/api/user', user).success(function(data) {
                        $scope.users[data._id] = data;
                    });
                }

                $scope.updateUser = function(user) {
                    $http.put('/api/user', user).success(function(data) {
                        $scope.users[data._id] = data;
                    });
                }

                $scope.del = function(uid) {
                    $http.delete('/api/user/' + uid).success(function() {
                        delete $scope.users[uid];
                    });
                }
            }
        ])
})()
