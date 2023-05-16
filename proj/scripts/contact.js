var app = angular.module("myApp", []);

app.controller("contactCtrl", function($scope, $http, $interval) {
    $scope.entries = [];

    $http.get("../pages/display.php").then(function(response) {
        $scope.entries = response.data;
    });

    $interval(function() {
        $http.get("../pages/display.php").then(function(response) {
            $scope.entries = response.data;
        });
    }, 5000);

    $scope.submitForm = function() {
        $http.post("../pages/submit.php", {
            "email": $scope.email,
            "grievance": $scope.grievance
        }).then(function(response) {
            $scope.message = response.data;
            $scope.email = "";
            $scope.grievance = "";
        }, function(response) {
            $scope.message = response.data;
        });
    };
});
