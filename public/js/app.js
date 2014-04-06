'use strict';

var pollApp = angular.module('pollApp', [
    'ngRoute'
]);

pollApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'assets/partials/index.html',
            controller: 'IndexCtrl'
        }).
        when('/:pollId', {
            templateUrl: 'assets/partials/poll.html',
            controller: 'PollCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);