angular.module('startet.controllers.register', [])

.controller('RegisterCtrl', function($scope, AccountService, $ionicPopup, $http, $state) {
  
  $scope.registerData = {};
  
  $scope.register = function(registerData) {
    registerData.type = "TEACHER";
    AccountService.register({}, registerData)
    .$promise.then(function(successResult) {
      window.localStorage['token'] = successResult.token;
      window.localStorage['role'] = successResult.role;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = successResult.token;
      $state.go('tab.activities');
    }, function(errorResult) {
      var message = "Fehler bei der Registrierung!";
      if(errorResult.headers('X-SCOOLTIVITY-ERROR') !== null){
        message = errorResult.headers('X-SCOOLTIVITY-ERROR');
      }
      $scope.showError(message);
      
    });
  };
  
  $scope.showError = function(error){
    $ionicPopup.alert({
      title : 'Fehler',
      template : error,
      okType : 'button-assertive'
    });
  };
  
});