angular.module('starter.controllers.login', [])

.controller('LoginCtrl', function($scope, AccountService, $ionicPopup, $http, $state, $cordovaBarcodeScanner, $ionicLoading) {
  
  $scope.loginData = {};
  
  $scope.scanning = true;
  
  $scope.login = function(loginData) {
    AccountService.login({}, loginData)
    .$promise.then(function(successResult) {
      window.localStorage['token'] = successResult.token;
      window.localStorage['role'] = successResult.role;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = successResult.token;
      $state.go('tab.dash');
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
    // Workaround for multiple calls
    if($scope.scanning){
      console.log("Scanning already in progress");
//      return;
    }
    
    $cordovaBarcodeScanner
    .scan()
    .then(function(barcodeData) {
      console.log("We got a barcode\n" +
          "Result: " + barcodeData.text + "\n" +
          "Format: " + barcodeData.format + "\n" +
          "Cancelled: " + barcodeData.cancelled);
      $scope.scanning = false;
      if(barcodeData.cancelled){
        console.log("Scanning aborted");
        return;
      }
      
      var token = JSON.parse(barcodeData.text);
      window.localStorage['token'] = token;
      window.localStorage['role'] = token.type;
      $http.defaults.headers.common['X-AUTH-TOKEN'] = token;
      $state.go('tab.dash');

      $ionicLoading.show({
          template: 'In Bearbeitung...'
        });
      
    }, function(error) {
      $scope.showError("Scannen fehlgeschalgen: " + error);
      $scope.scanning = false;
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