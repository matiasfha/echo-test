'use strict';

describe('Factories',function(){
	beforeEach(module('echoServices'));

	describe('Factory: Socket',function(){
		var Socket;
		beforeEach(inject(function(_Socket_){
			Socket = _Socket_;
		}));

		

		it('should have on and emit method',function(){
			expect(Socket.on).toBeDefined();
			expect(Socket.emit).toBeDefined();
		});

		it('should have the io object defined',function(){
			expect(window.io).toBeDefined();
		});
	});

	describe('Factory: SoundSocket',function(){
		var SoundSocket,$rootScope;
		beforeEach(inject(function($rootScope,_SoundSocket_){
			$rootScope = $rootScope;
			SoundSocket = _SoundSocket_;

			
		}));

		it('should have list metod',function(){
			expect(SoundSocket.listen).toBeDefined();
		});


	});
});

