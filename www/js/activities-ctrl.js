angular.module('starter.controllers.activities', [])

.controller('ActivitiesCtrl', function($scope, ActivityService, TokenService, $ionicPopup) {
  
  $scope.activityData = [];
  $scope.newActivity = {};
  $scope.onlyOwnAktivities = false;
  $scope.emailFilter = '';
  
  $scope.getActivities = function(){
    $scope.showAddButton = 'TEACHER' === window.localStorage['role'];
    $scope.tokenData = TokenService.getPayload(window.localStorage['token']);
    console.log("get data for email: " + $scope.tokenData.email);
    
    ActivityService.query({email: $scope.tokenData.email, schoolName: $scope.tokenData.schoolName},{})
    .$promise.then(function(successResult) {
      $scope.activityData = successResult;
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
        $scope.showError("HTTP ERROR (" + errorResult.status +")");
      };
    });
  };
  
  $scope.addActivity = function(){
    
    $ionicPopup.show({
      template: '<input type="text" ng-model="newActivity.title" placeholder="Titel"><br><textarea ng-model="newActivity.description" placeholder="Beschreibung"  class="textarea-description"></textarea>',
      title: 'Neue Aktivität',
      subTitle: 'Beschreiben Sie die neue Aktivität',
      scope: $scope,
      buttons: [
        { text: 'Abbrechen' },
        {
          text: '<b>Speichern</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.newActivity.title || !$scope.newActivity.description) {
              e.preventDefault();
            } else {
              // Store activity
              $scope.newActivity.schoolName = $scope.tokenData.schoolName;
              ActivityService.save({}, $scope.newActivity)
              .$promise.then(function(successResult) {
                $scope.activityData.push(successResult);
                $scope.newActivity = {};
              },
              function(errorResult) {
                $scope.handleErrorResult(errorResult);
              });
            }
          }
        }
      ]
    });
  };

  
  $scope.subscribe = function(activity){
    ActivityService.subscribe({activityId: activity.activityId, email: $scope.tokenData.email}, {})
      .$promise.then(function(successResult) {
        activity.subscribed = true;
    },
    function(errorResult) {
      $scope.handleErrorResult(errorResult);
    });
  };
  
  $scope.unsubscribe = function(activity){
      ActivityService.unsubscribe({activityId: activity.activityId, email: $scope.tokenData.email}, {})
      .$promise.then(function(successResult) {
        activity.subscribed = false;
    },
    function(errorResult) {
      $scope.handleErrorResult(errorResult);
    });
  };

  $scope.handleErrorResult = function(errorResult){
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
      $scope.showError("HTTP ERROR (" + errorResult.status +")");
    };
  };
  
  $scope.showError = function(error){
    $ionicPopup.alert({
      title : 'Fehler',
      template : error,
      okType : 'button-assertive'
    });
  };
  
  // get activities on startup
  $scope.getActivities();
});
