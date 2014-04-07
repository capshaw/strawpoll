'use strict';

pollApp.controller('PollCtrl', function PollCtrl($scope, $http, $routeParams, $location) {
    $http({
        method: 'GET',
        url: '/poll/' + $routeParams.pollId
    }).
    success(function(data, status, headers, config) {
        $scope.poll = data;
    }).
    error(function(data, status, headers, config) {
        $location.path('/');
    });
});

pollApp.controller('IndexCtrl', function IndexCtrl($scope, $http, $location) {

    $scope.choices = [{ val: "" }, { val: "" }];

    $scope.createPoll = function () {

        var choices = $scope.choices.map(function (e){
            return e.val;
        }).join("\n");

        $http({
            method: 'POST',
            url: '/poll',
            data: {
                question: $scope.question,
                choices: choices
            }
        }).
        success(function(data, status, headers, config) {
            $location.path('/' + data.id);
        }).
        error(function(data, status, headers, config) {
            console.log('error: poll POST failed.');
        });
    };

    $scope.removeChoice = function (index) {
        $scope.choices.splice(index, 1);
    };

    $scope.addChoice = function () {
        $scope.choices.push({ val: "" });
    };
});