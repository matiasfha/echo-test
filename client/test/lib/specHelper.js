/*jshint unused:false */
/*jshint undef:false*/
'use strict';
var specHelper = (function(){
	var verifyNoOutstandingHttpRequests = function(){
		afterEach(inject(function($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));
	};

	var fakeRouteProvider = function($provide) {
        /**
         * Stub out the $routeProvider so we avoid
         * all routing calls, including the default route
         * which runs on every test otherwise.
         * Make sure this goes before the inject in the spec.
         */
        $provide.provider('$route', function() {
            /* jshint validthis:true */
            this.when = sinon.stub();
            this.otherwise = sinon.stub();

            this.$get = function() {
                return {
                    // current: {},  // fake before each test as needed
                    // routes:  {}  // fake before each test as needed
                    // more? You'll know when it fails :-)
                };
            };
        });
    };
    return {
    	fakeRouteProvider: fakeRouteProvider,
    	verifyNoOutstandingHttpRequests: verifyNoOutstandingHttpRequests
    };
})();