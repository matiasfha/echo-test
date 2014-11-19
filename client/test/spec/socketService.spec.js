'use strict';

describe('Factory: Socket',function(){
	beforeEach(module('echoServices'));
	var Socket,$rootScope;
	beforeEach(inject(function(_Socket_,_$rootScope_){
		Socket = _Socket_;
		$rootScope = _$rootScope_;
	}));

	it('should be defined',function(){
		expect(Socket).not.to.equal(null);
	});

	it('should have the on and off method',function(){
		expect(Socket.on).not.to.equal(null);
		expect(Socket.off).not.to.equal(null);
	});
});