// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.controllers.dash', 'starter.controllers.login', 
                           'startet.controllers.register', 'starter.controllers.account', 'starter.services', 
                           'starter.constants', 'ngResource', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    cache: false,
    reload: true,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.add', {
      url: '/add',
      views: {
        'tab-add': {
          templateUrl: 'templates/tab-add.html',
          controller: 'AddCtrl'
        }
      }
    })

  .state('tab.account', {
    cache: false,
    reload: true,
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    onExit: function(){
      // This reload is needed for refresh the tab-bar
      window.location.reload();
    }
  })
  
  .state('register', {
    cache: false,
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.run(function ($rootScope, $state, $http) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    if(window.localStorage['token'] !== undefined && $http.defaults.headers.common['X-AUTH-TOKEN'] === undefined){
      $http.defaults.headers.common['X-AUTH-TOKEN'] = window.localStorage['token'];
    }
    
    if($http.defaults.headers.common['X-AUTH-TOKEN'] === undefined){
      if (next.name !== 'login' && next.name !== 'register') {
        event.preventDefault();
        console.log("Unauthorized access! Redirect from " + next.name + " to login");
        $state.go('login');
        return;
      }
    }
    
  });
})
;
