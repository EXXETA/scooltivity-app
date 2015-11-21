angular.module('starter.constants', [])

.constant('AUTH_EVENTS', {
  notAuthenticated : 'auth-not-authenticated',
  notAuthorized : 'auth-not-authorized'
})

.constant('USER_ROLES', {
  admin : 'TEACHER',
  cashier : 'STUDENT'
})

.constant('SYSTEM', {
//  host : 'https://service.scooltivity.de',
//  port : 8443
//  host : 'http://192.168.14.48',
  host : 'http://localhost',
  port : '8080'
});
