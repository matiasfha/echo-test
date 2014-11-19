'use strict';

describe('Factory: Stream',function(){
	var $q,Stream,$httpBackend;
	beforeEach(module('echoServices'));

	beforeEach(inject(function(_Stream_,_$q_,_$httpBackend_){
		$q = _$q_;
		Stream = _Stream_;
		$httpBackend = _$httpBackend_;
		
	}));

	it('should be defined',function(){
		expect(Stream).not.to.equal(null);
	});

	it('should have the query method',function(){
		expect(Stream.query).not.to.equal(null);
	});

	it('should return streams',function(done){
		$httpBackend.when('GET','api/streams').respond(200,mockData.getStreams());
		Stream.query(function(data){
			expect(data.streams.length).to.equal(1);
			done();
		});
		$httpBackend.flush();

	});
});