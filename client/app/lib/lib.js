'use strict';

angular.module('lmsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lib', {
        templateUrl: 'app/lib/lib.html',
        controller: 'LibCtrl'
      });
  });
