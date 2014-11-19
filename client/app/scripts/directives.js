'use strict';
(function(){


	var module = angular.module('echoDirectives',['echoSoundManager','ui.bootstrap.progressbar']);

	module.directive('echoSound',function($rootScope,SoundManager,SoundSocket){
		return {
			restrict: 'A',
			templateUrl:'template/soundManager.html',
			replace:true,
			link:function(scope,element,attrs){
				scope.artwork_url = attrs.artwork;
				var uid = attrs.uid,
				url = attrs.url,
				volume = attrs.volume;
				scope.volume = volume;
				SoundManager.createSound(uid,url,volume);
				scope.progress = 0;

				SoundSocket.listen();
			},
			controller:function($scope,$rootScope){
				$scope.play = function(){
					SoundManager.play();
				};

				$scope.pause = function(){
					SoundManager.pause();
				};

				$scope.stop = function(){
					SoundManager.stop();
				};

				$rootScope.$on('sound:volume',function(event,data){
					$scope.volume = data.volume;
				});
				$rootScope.$on('sound:progress',function(){
					$scope.progress = SoundManager.getProgress();
				});
				//From Socket.io
				$rootScope.$on('sound:server:pause',function(){
					SoundManager.pause();
					
				});
				$rootScope.$on('sound:server:volume',function(event,data){
					SoundManager.setVolume(data.volume);
				});
				$rootScope.$on('sound:server:progress',function(event,data){
					SoundManager.setProgress(data.progress);
				});
			}
		};
	});
})();