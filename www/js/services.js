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

.service(
    'LoginService',
    function($rootScope, $q, $http, USER_ROLES, SYSTEM, $ionicPopover) {
      
      var isAuthenticated = false;
      window.localStorage.removeItem('token');
      var role = '';
      
      showLogin = function(){
        $rootScope.loginData = {};
        
        $ionicPopover.fromTemplateUrl('templates/login.html', {
          scope: $rootScope
        }).then(function(popover) {
          $rootScope.popover = popover;
          $rootScope.popover.show();
        });
    };

      var login = function(email, password) {};



      var isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [ authorizedRoles ];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
      };

      return {
        showLogin : showLogin,
        login : login,
        logout : logout,
        isAuthorized : isAuthorized,
        isAuthenticated : function() {
          return isAuthenticated;
        },
        getRole : function() {
          return role;
        }
      };
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

;
