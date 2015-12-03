angular.module('starter.services', [])

.factory('AccountService', function($resource, SYSTEM) {
  var path = SYSTEM.host + ":" + SYSTEM.port + "/scooltivity/accounts";
  var AccountService = $resource(path, {}, 
     {
      'register' : {
        url : path,
        method : 'POST',
        timeout : 60000,
        headers : {
          'Content-Type' : 'application/json'
        }
      },
      'login' : {
        url : path + '/login',
        method : 'POST',
        timeout : 60000,
        headers : {
          'Content-Type' : 'application/json'
        }
      },
      'query' : {
        url : path + '/email/:email/school/:school',
        method : 'GET',
        timeout : 60000,
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    });
  return AccountService;
})

.service('TokenService', function($q){
  
  getPayload = function(token){
    var tokenSplitted = token.split('.');
    if(token.split('.').length != 3){
      return $q.reject('Account-Daten konnten nicht gelesen werden!');
    }
    
    var payload = tokenSplitted[1];
    
    return JSON.parse(atob(payload));
  };
  
  return {
    getPayload: getPayload
  };
})

.factory('ActivityService', function($resource, SYSTEM){
  var path = SYSTEM.host + ":" + SYSTEM.port + "/scooltivity/activities";
  var ActivityService = $resource(path, {}, {
    'query' : {
      method : 'GET',
      timeout : 60000,
      headers : {
        'Content-Type' : 'application/json'
      },
      isArray: true
    },
    'save' : {
      method : 'POST',
      timeout : 60000,
      headers : {
        'Content-Type' : 'application/json'
      }
    },
    'subscribe' : {
      url : path + "/:activityId/subscriptions/:email",
      method : 'POST',
      timeout : 60000,
      headers : {
        'Content-Type' : 'application/json'
      }
    },
    'unsubscribe' : {
      url : path + "/:activityId/subscriptions/:email",
      method : 'DELETE',
      timeout : 60000,
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  });
  return ActivityService;
})

;
