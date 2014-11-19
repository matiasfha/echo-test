'use strict';
(function(){


	var module = angular.module('echoSoundManager',[]);
	module.factory('SoundManager',function($rootScope,$window,$interval){
		var SoundMgr = function(){
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
			
		};
		SoundMgr.prototype.duration = 0;
		SoundMgr.prototype.progress = 0;
		SoundMgr.prototype.manager = null;
		SoundMgr.prototype.currentTrack = null;
		SoundMgr.prototype.state = 'stopped';
		SoundMgr.prototype.createSound = function(uid,url,volume){
			var self = this;
			var sound = $window.soundManager.createSound({
				id:uid,
				url:url,
				autoLoad:true,
				autoPlay:true,
				onload: function(){
					$rootScope.$emit('sound:loaded',{id:uid});
					self.duration = this.durationEstimate;
				},
				volume:volume,
				whileplaying:function(){
					self.progress = this.position;
				}
			});
			self.startInterval();
			this.currentTrack = uid;
			this.state = 'playing';
			return sound;
		};

		SoundMgr.prototype.startInterval = function(){
			var self = this;
			this.progressInterval = $interval(function(){
				console.log('Exec '+self.getProgress());
				$rootScope.$emit('sound:progress',self.getProgress());	
			},1000);
		};
		SoundMgr.prototype.play = function(){
			if(this.currentTrack!== null && this.state!=='playing'){
				this.manager.play(this.currentTrack);
				this.state = 'playing';
				$rootScope.$emit('sound:play',{id:this.currentTrack});
				this.startInterval();
			}	
		};

		SoundMgr.prototype.pause = function(){
			if(this.state === 'paused'){
				this.play(this.currentTrack);
			}else{
				this.manager.pause(this.currentTrack);
				this.state = 'paused';
				$interval.cancel(this.progressInterval)
				$rootScope.$emit('sound:pause',{id:this.currentTrack});	
			}
			
		};

		SoundMgr.prototype.stop = function(){
			this.pause();
			this.setProgress(0);
			$rootScope.$emit('sound:stop',{id:this.currentTrack});
			this.manager.stop(this.currentTrack);
			this.manager.unload(this.currentTrack);
			this.state = 'stopped';
			$interval.cancel(this.progressInterval)
		};

		SoundMgr.prototype.setVolume = function(volume){
			this.manager.setVolume(this.currentTrack,volume);
			$rootScope.$emit('sound:volume',{id:this.currentTrack,volume:volume});
		};
		/*
		* position integer - percent
		*/
		SoundMgr.prototype.setProgress = function(position){
			var ms = (position*this.duration)/100;
			this.manager.setPosition(this.currentTrack,ms);
			if(ms === 0){
				this.progress = 0;
			}else{
				if(this.state !== 'playing'){
					this.play();
				}
			}
			this.progress = ms;
			$rootScope.$emit('sound:progress',ms);
		};
		/* 
		* return progress in percent
		*/
		SoundMgr.prototype.getProgress = function(){
			return ((this.progress*100)/this.duration).toFixed(2);
		};

		var sm = new SoundMgr();
		return sm;

	});
})();
