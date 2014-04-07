'use strict';

pollApp.controller('IndexCtrl', function IndexCtrl($scope, $http, $location,
    apiService) {

    $scope.samples = [
        {
            question: "What is your favorite genre of music?",
            answers: ["Blues", "Electronic", "Jazz", "Pop", "Rock"]
        },
        {
            question: "What is your favorite operating system?",
            answers: ["Windows", "OSX", "Ubuntu"]
        },
        {
            question: "What art movement makes you happiest?",
            answers: ["Romanticism", "Realism", "Impressionism", "Post-Impressionism", "Expressionism", "Cubism", "Modern"]
        }
    ]

    $scope.createPoll = function() {

        var choices = $scope.choices.map(function (e){
            return e.val;
        }).join("\n");

        apiService.postPoll($scope.question, choices).then(function(data){
            $location.path('/' + data.id.toString(16));
        }, function(){
            console.log('error: poll POST failed.');
        });
    };

    $scope.removeChoice = function(index) {
        $scope.choices.splice(index, 1);
    };

    $scope.addChoice = function(value) {
        $scope.choices.push({ val: (value == null) ? "" : value });
    };

    $scope.clear = function() {
        $scope.question = "";
        $scope.choices = [{ val: "" }, { val: "" }];
    };

    $scope.randomSample = function() {
        var choice = {
            question: "",
            answers: []
        };

        /* Don't choose the same random question twice in row. */
        do {
            var index = Math.floor(Math.random() * $scope.samples.length);
            choice = $scope.samples[index];
        } while ($scope.question == choice.question);

        $scope.question = choice.question;
        $scope.choices = [];
        for (var i = 0; i < choice.answers.length; i++) {
            $scope.addChoice(choice.answers[i]);
        }
    };

    $scope.clear();
});