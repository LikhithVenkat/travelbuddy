var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
  $scope.view = 'grid';
  
  
  
  $scope.toggleView = function() {
    $scope.view = $scope.view === 'list' ? 'grid' : 'list';
  };
});
