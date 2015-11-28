angular.module('starter.controllers.login', [])

.controller('LoginCtrl', function($scope, AccountService, $ionicPopup, $http, $state, $cordovaBarcodeScanner, TokenService) {
  
  $scope.loginData = {};
  
  $scope.login = function(loginData) {
    AccountService.login({}, loginData)
    .$promise.then(function(successResult) {
      window.localStorage['token'] = successResult.token;
      window.localStorage['role'] = successResult.role;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = successResult.token;
      $scope.showAddTab = 'TEACHER' === successResult.role;
      $state.go('tab.activities', {}, {reload: true});
    }, function(errorResult) {
      var message = "Fehler bei der Anmeldung!";
      if(errorResult.headers('X-SCOOLTIVITY-ERROR') !== null){
        message = errorResult.headers('X-SCOOLTIVITY-ERROR');
      }
      $scope.showError(message);
      
    });
  };
  
  $scope.qrLogin = function(){
    console.log("Start scanning...");
    
    $cordovaBarcodeScanner
    .scan()
    .then(function(barcodeData) {
      console.log("We got a barcode\n" +
          "Result: " + barcodeData.text + "\n" +
          "Format: " + barcodeData.format + "\n" +
          "Cancelled: " + barcodeData.cancelled);
      if(barcodeData.cancelled){
        console.log("Scanning aborted");
        return;
      }
   
      window.localStorage['token'] = barcodeData.text;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = barcodeData.text;
      window.localStorage['role'] = TokenService.getPayload(barcodeData.text).type;
      $scope.showAddTab = 'TEACHER' === window.localStorage['role'];
      $state.go('tab.activities');
      
    }, function(error) {
      $scope.showError("Scannen fehlgeschalgen: " + error);
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