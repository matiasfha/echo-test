'use strict';
(function(){


    var module = angular.module('echoServices',[]);

    module.factory('Stream', function($resource){
    	return $resource('api/streams/:uid', {uid: '@uid'},{'query':{method:'GET',isArray:false}});
    });

    module.factory('Socket', function ($rootScope) {
            var socket = io.connect('http://localhost:3000');
            return {
                on: function (eventName, callback) {
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                },
                emit: function (eventName, data, callback) {
                    socket.emit(eventName, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback.apply(socket, args);
                            }
                        });
                    });
                }
            };
      });

    module.factory('SoundSocket',function(Socket,$rootScope){
        return {
            listen:function(){
                Socket.on('sound:server:pause',function(data){
                    $rootScope.$emit('sound:server:pause',{uid:data.uid});
                });
                Socket.on('sound:server:volume',function(data){
                    $rootScope.$emit('sound:server:volume',{uid:data.uid,volume:data.volume}); 
                });
                Socket.on('sound:server:progress',function(data){
                    $rootScope.$emit('sound:server:progress',{uid:data.uid,progress:data.progress}); 
                });
            }
        };
        
    });
})();
