'use strict';

angular.module('lmsApp')
  .controller('LibCtrl', function ($scope,$http) {
    $scope.message = 'Hello';
    $http.get('/api/books').then(function (response) {
    	$scope.oldbooks = response.data;
    	console.log("oldbooks:")
    	console.log($scope.oldbooks);	
    });

    $scope.remallcop = function(id){
    	console.log("Deleting");
    	console.log(id);
    
    	$http.delete('/api/books/'+id).then(function (response) {
        		console.log(response.data);
        		location.reload();
      	});
    }

    $scope.remonecop = function(id){
    	console.log("Deleting one");
    	console.log(id);
   
    	$http.delete('/api/books/one/'+id).then(function (response) {
        		console.log(response.data);
        		location.reload();
      	});
    }

    $scope.addbook = function(form){
    	var newbook = {
    		title: $scope.book.title,
    		publisher: $scope.book.publisher,
    		author: $scope.book.author,
    		count: $scope.book.count
    	}
    	$http.post('/api/books', newbook).then(function (response) {
        		console.log(response.data);
        		location.reload();
      	})
    }

    $scope.update = function(oldbook,id){
    	 console.log(oldbook);
    	/*var updatebook = {
    		title: form.title,
    		publisher: form.publisher,
    		author: form.author,
    		count: form.count
    	}*/

    	$http.put('/api/books/'+id, oldbook).then(function (response) {
        		console.log(response.data);
        		location.reload();
      	});
    }
  });
