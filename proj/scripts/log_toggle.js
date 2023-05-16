var app1 = angular.module('myApp1',[]);
app1.controller('myCtrl1', function($scope, $http, $window) {
    $scope.isLoggedIn=false;
    $http.get('/checksession')
      .then(function(response) {
        if (response.data) {
          $scope.isLoggedIn = true;
        } else {
          $scope.isLoggedIn = false;
        }
      });
  
    $scope.logout = function() {
      $http.get('/logout')
        .then(function(response) {
          $scope.isLoggedIn = false;
        });
    }
  });
  