angular.module('starter.controllers', [])

.controller('AddCtrl', function($scope, AccountService, $ionicPopup, $http, $state, $ionicPopover) {
  
  $scope.showContent = 'TEACHER' === window.localStorage['role'];
  $scope.studentData = {};
  
  $scope.add = function(studentData) {
    studentData.type = "STUDENT";
    studentData.token = window.localStorage['token'];
    AccountService.register({}, studentData)
    .$promise.then(function(successResult) {
      $scope.studentToken = successResult.token;
      $scope.showQrCode(successResult.token);
      $state.go('tab.add');
    }, function(errorResult) {
      if(errorResult.status === 0){
        $scope.showError("Server nicht erreichbar!");
      } else if(errorResult.status === 409){
        $scope.showError("Der Benutzer ist bereits registriert!");
      } else {
        $scope.showError("Fehler bei der Anmeldung!");
      }
      
    });
  };
  
  $scope.showQrCode = function(text){
    var image = $scope.createQrCode(text);
    $ionicPopup.show({
      template: '<center>' + image  + '</center>',
      cssClass: 'qr-popup',
      title: 'QR-Code f&uuml;r Schüler',
      subTitle: $scope.studentData.firstName + ' ' + $scope.studentData.lastName,
      scope: $scope,
      buttons: [
        {
          text: '<b>Fertig</b>',
          type: 'button-positive',
          onTap: function(e) {
            $scope.studentData = {};
          }
        }
      ]
    });
  };
  
  $scope.createQrCode = function(text) {
    var qr = qrcode(15, 'M');
    qr.addData(text);
    qr.make();
    return qr.createImgTag(3, 8);
  };
  
  $scope.skipPopover = function() {
    $scope.popover.remove();
  };
  
  $scope.showMessage = function(message){
    $ionicPopup.alert({
      title : 'Bestätigung',
      template : message,
      okType : 'button-positive'
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