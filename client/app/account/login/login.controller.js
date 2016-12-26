'use strict';

angular.module('lmsApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      console.log("Sudheer")
      $scope.submitted = true;

      if(form.$valid) {
        console.log("Sudheer1");
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password

        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/admin');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
