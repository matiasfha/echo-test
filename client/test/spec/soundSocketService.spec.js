'use strict';

describe('Factory: SoundSocket',function(){
	beforeEach(module('echoServices'));
	var SoundSocket,$rootScope,Socket;

	beforeEach(module(function($provide){
			$provide.value('Socket',new sockMock());
	}));
	beforeEach(inject(function(_SoundSocket_,_$rootScope_,_Socket_){
		SoundSocket = _SoundSocket_;
		$rootScope = _$rootScope_;
		Socket = _Socket_;
		sinon.spy($rootScope,'$emit')

	}));


	

	it('should be defined',function(){
		expect(SoundSocket).not.to.equal(null);
	});

	it('should have the listen method',function(){
		expect(SoundSocket.listen).not.to.equal(null);
	});


});