'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('echoApp'));

  var MainCtrl,scope,$q,mockStreamService,deferred,
  jsonObject;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,_$q_) {
    $q = _$q_;
    
    jsonObject = {  
      "streams":[  
        {  
          "id":1,
          "uid":"02cd816a2b654f59282e2476384488df",
          "stream_url": "https://s3.amazonaws.com/echoapp/oasis_wonder_wall.mp3",
          "volume":77.0,
          "progress":0.32,
          "artwork_url": "http://media-cache-ec0.pinimg.com/736x/f1/36/0b/f1360b6e96e2e9d95c6942fcc9065afc.jpg",
        }
      ]
    };
    mockStreamService = {
      query: function(){
        deferred = $q.defer();
        deferred.resolve(jsonObject);
        return deferred.promise;
      }
    };
    
    spyOn(mockStreamService,'query').and.callThrough();
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $rootScope:$rootScope,
      $scope: scope,
      Stream:mockStreamService
    });
  }));
  it('should be defined',function(){
    expect(MainCtrl).toBeDefined();
  });

  
  it('should query the StreamService', function () {
    expect(mockStreamService.query).toHaveBeenCalled();
  });
  

});
