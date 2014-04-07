'use strict';

pollApp.controller('PollCtrl', function PollCtrl($scope, $http, $routeParams,
    $location, $timeout, apiService) {

    $scope.getPollInitial = function() {
        $scope.id = parseInt($routeParams.pollId, 16);
        apiService.getPoll($scope.id).then(function(data){
            $scope.poll = data;
            $scope.clockTick();
        }, function(data){
            $location.path('/');
        });
    };

    $scope.clockTick = function() {
        var current_time = (new Date()).getTime();
        var diff = $scope.poll.expiration - current_time;
        $scope.time_left = $scope.getTimeTuple(Math.max(0, diff));
        $timeout($scope.clockTick, 1000);
    };

    $scope.getTimeTuple = function(milliseconds) {
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

    $scope.vote = function(choice) {
        apiService.castVote($scope.id, choice).then(function() {
            console.log("success!");
        });
    };

    $scope.getPollInitial();
});