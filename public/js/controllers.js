'use strict';

pollApp.controller('PollCtrl', function PollCtrl($scope, $http, $routeParams, $location, $timeout) {
    $http({
        method: 'GET',
        url: '/poll/' + $routeParams.pollId
    }).
    success(function(data, status, headers, config) {
        $scope.poll = data;
        $scope.clockTick();
    }).
    error(function(data, status, headers, config) {
        $location.path('/');
    });

    $scope.clockTick = function () {
        var current_time = (new Date()).getTime();
        var diff = $scope.poll.expiration - current_time;
        $scope.time_left = $scope.getTimeTuple(Math.max(0, diff));
        $timeout($scope.clockTick, 1000);
    };

    $scope.getTimeTuple = function (milliseconds) {
        var tuple = {
            seconds: Math.floor((milliseconds / 1000) % 60),
            minutes: Math.floor((milliseconds / (1000*60)) % 60),
            hours:   Math.floor((milliseconds / (1000*60*60)) % 24)
        };

        if (tuple.seconds < 10) {
            tuple.seconds = "0" + tuple.seconds;
        }

        return tuple;
    };
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