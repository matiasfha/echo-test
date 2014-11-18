'use strict';

angular.module('echoApp')
    .controller('MainCtrl', function ($rootScope,$scope, Stream, Socket,$resource) {
        
    	Socket.on('getcalled', function(data){
            $scope.socketdata = data;
        });

        Stream.query(function(data){
        	$scope.streams = data.streams;
        });

        

    });
