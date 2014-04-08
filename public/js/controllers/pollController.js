'use strict';

var POLL_VALID_MILLISECONDS = 1000 * 60 * 15;

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

        /* Update clock countdown. */
        var current_time = (new Date()).getTime();
        var diff = $scope.poll.expiration - current_time;
        $scope.time_left = $scope.getTimeTuple(Math.max(0, diff));

        $scope.progressBarStyle = {
            right: Math.max((diff / POLL_VALID_MILLISECONDS * 100), 0) + "%"
        };

        /* If there is still time remaining, update the data and set the next
         * clock tick timeout.*/
        if (diff > 0) {
            // TODO: use websockets instead (push instead of pull)
            apiService.getPoll($scope.id).then(function(data){
                $scope.poll = data;
            });

            $timeout($scope.clockTick, 1000);
        }
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
        apiService.castVote($scope.id, choice);
    };

    $scope.getPollInitial();
});