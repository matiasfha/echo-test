'use strict';

angular.module('echoApp', ['echoServices','ngResource','ngRoute','echoSoundManager','echoDirectives'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  
