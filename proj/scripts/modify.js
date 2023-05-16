/* const nameInput = document.getElementById("name-input");
const addButton = document.getElementById("add-button");
const namesContainer = document.getElementById("names-container");
let names = [];
function renderNames() {
  namesContainer.innerHTML = "";
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const li = document.createElement("li");
    li.innerText = name;
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      names.splice(i, 1);
      renderNames();
    });
    li.appendChild(removeButton);
    namesContainer.appendChild(li);
  }
}
addButton.addEventListener("click", () => {
  const name = nameInput.value;
  names.push(name);
  nameInput.value = "";
  renderNames();
}); */
var app = angular.module("friends_list", []);
app.controller("myCtrl", function($scope) {
  $scope.names = [];
  $scope.addItem = function () {
    $scope.errortext = "";
    if (!$scope.addMe) {return;}
    if ($scope.names.indexOf($scope.addMe) == -1) {
      $scope.names.push($scope.addMe);
    } else {
      $scope.errortext = "The name is already in your friends list.";
    }
  }
  $scope.removeItem = function (x) {
    $scope.errortext = "";
    $scope.names.splice(x, 1);
  }
});


