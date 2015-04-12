describe("ExperimentsController", function() {
  // declare vars to they can escape the $inject closure
  var ctrl, httpBackend, location, resource, routeParams, scope, setupController;
  scope = null;
  ctrl = null;
  location = null;
  routeParams = null;
  resource = null;
  httpBackend = null;

  // users Angular $inject to access mock dependencies bc
  // routeParams can only be manipulated during injection
  setupController = function(keywords, results) {
    return inject(function($location, $routeParams, $rootScope, $resource, $httpBackend, $controller) {
      var request;
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      httpBackend = $httpBackend;
      routeParams = $routeParams;
      routeParams.keywords = keywords;
      if (results) {
        request = new RegExp("\/experiments.*keywords=" + keywords);
        httpBackend.expectGET(request).respond(results);
      }
      return ctrl = $controller("ExperimentsController", {
        $scope: scope,
        $location: location
      });
    });
  };

  beforeEach(module("diatomic"));
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    return httpBackend.verifyNoOutstandingRequest();
  });

  // 1. check that on init with no keywords, experiments is empty
  // toEqualData set up in spec_helper to compare values
  describe('controller initialization', function() {
    describe('when no keywords present', function() {
      beforeEach(setupController());
      return it('defaults to no experiments', function() {
        return expect(scope.experiments).toEqualData([]);
      });
    });
      // 2. check that on init WITH keywords, experiments is populated
    return describe('with keywords', function() {
      var keywords, experiments;
      keywords = 'foo';
      experiments = [
        {
          id: 2,
          type: 'Baked Potatoes'
        }, {
          id: 4,
          type: 'Potatoes Au Gratin'
        }
      ];
      beforeEach(function() {
        setupController(keywords, experiments);
        return httpBackend.flush();
      });
      return it('calls the back-end', function() {
        return expect(scope.experiments).toEqualData(experiments);
      });
    });
  });
  return describe('search()', function() {
    beforeEach(function() {
      return setupController();
    });
    return it('redirects to itself with a keyword param', function() {
      var keywords;
      keywords = 'foo';
      scope.search(keywords);
      expect(location.path()).toBe("/");
      return expect(location.search()).toEqualData({
        keywords: keywords
      });
    });
  });
});
