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
    host : 'https://service.zamo.eu',
    port : 9443
//  host : 'http://localhost',
//  port : '8080'
});
