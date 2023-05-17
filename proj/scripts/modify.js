var app = angular.module("friends_list", []);
app.controller("myCtrl", function($scope, $http) {
  $scope.names = [];
  $scope.addItem = function() {
    $scope.errortext = "";
    if (!$scope.addMe) {
      return;
    }
    if ($scope.names.indexOf($scope.addMe) === -1) {
      $scope.names.push($scope.addMe);
      saveFriendList();
    } else {
      $scope.errortext = "The name is already in your friends list.";
    }
  };

  $scope.removeItem = function(x) {
    $scope.errortext = "";
    $scope.names.splice(x, 1);
    saveFriendList();
  };

  function saveFriendList() {
    const friendListData = {
      friendsEmails: $scope.names,
    };

    $http.post('/save_friends', friendListData)
      .then(() => {
        console.log('Friend list saved successfully');
      })
      .catch((error) => {
        console.error('Error saving friend list:', error);
      });
  }
});