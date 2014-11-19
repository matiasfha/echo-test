'use strict';
(function(){

	angular.module('echoApp')
	.controller('MainCtrl', function ($scope, Stream) {
		Stream.query(function(data){
			$scope.streams = data.streams;
		});
	});
})();
