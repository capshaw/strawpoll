'use strict';

pollApp.controller('IndexCtrl', function IndexCtrl($scope, $http, $location,
    apiService) {

    $scope.choices = [{ val: "" }, { val: "" }];

    $scope.createPoll = function () {

        var choices = $scope.choices.map(function (e){
            return e.val;
        }).join("\n");

        apiService.postPoll($scope.question, choices).then(function(data){
            $location.path('/' + data.id.toString(16));
        }, function(){
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