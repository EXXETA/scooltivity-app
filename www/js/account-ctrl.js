angular.module('starter.controllers.account', [])

.controller('AccountCtrl', function($scope, $http, $state, AccountService, $ionicPopup, TokenService) {
  
  
  
  $scope.getAccountData = function(){
    $scope.tokenData = TokenService.getPayload(window.localStorage['token']);
    console.log("get data for email: " + $scope.tokenData.email);
    
    AccountService.query({email: $scope.tokenData.email, school: $scope.tokenData.schoolName}, {})
      .$promise.then(function(successResult) {
        $scope.accountData = successResult;
        $scope.$broadcast('scroll.refreshComplete');
      },
      function(errorResult) {
        $scope.$broadcast('scroll.refreshComplete');
        console.log("error=" + errorResult.status);
        if(errorResult.status === 404) {            
          $scope.showError("Benutzerkonto für " + $scope.tokenData.email + " und " + $scope.tokenData.schoolName  +" nicht gefunden!");
          event.preventDefault();
          $scope.logout();
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
          $scope.showError("HTTP ERROR (" + errorResult.status +")");
        };
      });
  };
  
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
  
  // get account data on startup
  $scope.getAccountData();
  
});