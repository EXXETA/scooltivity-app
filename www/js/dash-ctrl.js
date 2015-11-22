angular.module('starter.controllers.dash', [])

.controller('DashCtrl', function($scope, $ionicPopup, $state) {
  
  $scope.showAddTab = 'TEACHER' === window.localStorage['role'];
  
  
});
