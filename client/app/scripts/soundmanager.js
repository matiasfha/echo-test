'use strict';

var module = angular.module('echoSoundManager',[]);
module.factory('SoundManager',function($rootScope,$window,$timeout){
	var soundManager = function(){
		this.manager = $window.soundManager.setup({
			preferFlash:false,
			debugMode:false,
			useHTML5Audio:true,
			onready:function(){
				$rootScope.$emit('sound:ready');
			},
			ontimeout:function(){
				$rootScope.$emit('sound:timeout');
			}
		
		});
		this.currentTrack = null;
		var self = this;
		
	};
	soundManager.prototype.duration = 0;
	soundManager.prototype.progress = 0;
	soundManager.prototype.manager = null;
	soundManager.prototype.currentTrack = null;
	soundManager.prototype.state = 'stopped';
	soundManager.prototype.createSound = function(uid,url,volume){
		var self = this;
		var sound = $window.soundManager.createSound({
			id:uid,
			url:url,
			autoLoad:true,
			autoPlay:true,
			onLoad: function(){
				$rootScope.$emit('sound:loaded',{id:uid});
				self.duration = this.duration;
			},
			volume:volume,
			whileplaying:function(){
				self.progress = (this.position/this.duration)*100;
				$timeout(function(){
					$rootScope.$emit('sound:progress',self.progress);	
				},10000);
				
			}
		});
		this.currentTrack = uid;
		this.state = 'playing';
		return sound;
	};

	soundManager.prototype.play = function(){
		if(this.currentTrack!== null){
			this.manager.play(this.currentTrack);
			this.state = 'playing';
			$rootScope.$emit('sound:play',{id:this.currentTrack});
		}	
	};

	soundManager.prototype.pause = function(){
		if(this.state === 'paused'){
			this.play(this.currentTrack);
		}else{
			console.log('Pausing');
			this.manager.pause(this.currentTrack);
			this.state = 'paused';
			$rootScope.$emit('sound:pause',{id:this.currentTrack});	
		}
		
	};

	soundManager.prototype.stop = function(){
		this.pause();
		this.setProgress(0);
		$rootScope.$emit('sound:stop',{id:this.currentTrack});
		this.manager.stop(this.currentTrack);
		this.manager.unload(this.currentTrack);
		this.state = 'stopped'
	};

	soundManager.prototype.setVolume = function(volume){
		this.manager.setVolume(this.currentTrack,volume);
		$rootScope.$emit('sound:volume',{id:this.currentTrack,volume:volume});
	};
	/*
	* position integer - millisecons
	*/
	soundManager.prototype.setProgress = function(position){
		this.manager.setPosition(this.currentTrack,position);
		if(position === 0){
			$rootScope.$emit('sound:reset',{id:this.currentTrack});
		}
	};

	soundManager.prototype.getProgress = function(){
		return this.progress;
	}

	var sm = new soundManager();
	return sm;

})
