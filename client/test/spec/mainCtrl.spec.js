'use strict';
describe('Controller: Main',function(){
	var MainCtrl,scope,StreamMock;
	
	beforeEach(module('echoApp'));
	
	beforeEach(inject(function($q){
		StreamMock = {
			query: function(){
				var deferred = $q.defer();
				deferred.resolve(mockData.getStreams());
				return  deferred.promise;
			}
		};
		sinon.spy(StreamMock,'query');
	}));
	beforeEach(inject(function($rootScope,$controller){
		scope = $rootScope.$new();

		MainCtrl = $controller('MainCtrl',{
			$scope:scope,
			Stream:StreamMock
		});
	}));

	it('should be defined',function(){
		expect(MainCtrl).to.not.equal(null);
	});

	it('should call the stream service',function(){
		expect(StreamMock.query.calledOnce);
	});

	it('should create the streams variable inside the scope',function(){
		scope.$apply();
		expect(scope.streams).to.not.equal(null);
	});

})