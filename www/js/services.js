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

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
