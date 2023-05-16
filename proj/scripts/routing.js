var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/friends', {
      templateUrl: '../pages/friends.html'
    })
    .when('/login', {
      templateUrl: '../pages/login.html'
    })
    .when('/homepage', {
        templateUrl: '../pages/homepage.html'
      })
    .otherwise({
      redirectTo: '/'
    });
});








