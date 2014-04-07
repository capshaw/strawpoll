'use strict';

pollApp.factory('apiService', function($http, $q) {
    return {
        getPoll: function(id) {
            var d = $q.defer();
            $http({
                    method: 'GET',
                    url: '/poll/' + id
                }).
                success(function(data, status, headers, config) {
                    d.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
            return d.promise;
        },
        postPoll: function(question, choices) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: '/poll',
                    data: {
                        question: question,
                        choices: choices
                    }
                }).
                success(function(data, status, headers, config) {
                    d.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
            return d.promise;
        },
        castVote: function(id, choice) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: '/vote/' + id + '/' + choice
                }).
                success(function(data, status, headers, config) {
                    d.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    d.reject();
                });
            return d.promise;
        }
   }
});