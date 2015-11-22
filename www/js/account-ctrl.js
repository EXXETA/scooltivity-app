angular.module('starter.controllers.account', [])

.controller('AccountCtrl', function($scope, $http, $state, AccountService, $ionicPopup, TokenService) {
  
  var token = window.localStorage['token'];
  
  $scope.tokenData = TokenService.getPayload(token);
  console.log("get data for email: " + $scope.tokenData.email);
  
  
  AccountService.query({email: $scope.tokenData.email, school: $scope.tokenData.schoolName}, {})
    .$promise.then(function(successResult) {
      $scope.accountData = successResult;
    },
    function(errorResult) {
        // do something on error
      console.log("error=" + errorResult.status);
        if(errorResult.status === 404) {            
          $scope.showError("Benutzerkonto für Email " + $scope.tokenData.email + " und Schule " + $scope.tokenData.schoolName  +" nicht gefunden!");
        }
        else if(errorResult.status === 401){
          $scope.writeError("Session lost (" + errorResult.status +")");
          event.preventDefault();
          $state.go('login');
        }
        else if(errorResult.status === 0){
          $scope.showError("Server nicht erreichbar!");
        }
        else{
          $scope.writeError("HTTP ERROR (" + errorResult.status +")");
        };
    });
  
  $scope.logout = function() {
    $http.defaults.headers.common['X-AUTH-TOKEN'] = undefined;
    delete window.localStorage['token'];
    delete window.localStorage['role'];
    $scope.accountData = {};
    $state.go('login');
  };
  

  
  $scope.showError = function(error){
    $ionicPopup.alert({
      title : 'Fehler',
      template : error,
      okType : 'button-assertive'
    });
  };
  
});