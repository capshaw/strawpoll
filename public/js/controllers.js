'use strict';

pollApp.controller('PollCtrl', function PollCtrl($scope, $http, $routeParams) {
    $http({
        method: 'GET',
        url: '/poll/' + $routeParams.pollId
    }).
    success(function(data, status, headers, config) {
        $scope.poll = data;
    }).
    error(function(data, status, headers, config) {
        console.log('error: poll GET failed.');
    });
});

pollApp.controller('IndexCtrl', function IndexCtrl($scope, $http, $location) {
    $scope.createPoll = function () {
        $http({
            method: 'POST',
            url: '/poll',
            data: {
                question: $scope.question,
                choices: $scope.choices
            }
        }).
        success(function(data, status, headers, config) {
            $location.path('/' + data.id);
        }).
        error(function(data, status, headers, config) {
            console.log('error: poll POST failed.');
        });
    };
});