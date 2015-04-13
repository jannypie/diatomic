describe("ExperimentsController", function(){
  var ctrl, exp, expId, httpBackend, routeParams, scope, setupController;
  scope = null;
  ctrl = null;
  routeParams = null;
  httpBackend = null;
  expId = 10;
  exp = {
    id: expId,
    title: "E.coli Gram Stain",
    description: "Basic method for determining E.coli gram stain restuls."
  };

  setupController = function(experimentExists){
    if (experimentExists == null) {
      experimentExists = true;
    };
    return inject(function($location, $routeParams, $rootScope, $httpBackend, $controller){
      var location = $location;
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      routeParams = $routeParams;
      routeParams.experimentId = expId;

      var request = new RegExp("\/experiments/" + expId);
      var results = experimentExists ? [200, exp] : [404];
      httpBackend.expectGET(request).respond(results[0], results[1]);

      return ctrl = $controller('ExperimentsController', {
        $scope: scope
      });
    });
  };

  beforeEach(module("diatomic"));
  afterEach(function(){
    httpBackend.verifyNoOutstandingExpectation();
    return httpBackend.verifyNoOutstandingRequest();
  });

  describe('controller initialization', function() {
    describe('experiment is found', function() {
      beforeEach(setupController());
      it('loads the experiment', function() {
        httpBackend.flush();
        expect(scope.experiment).toEqualData(exp);
      });
    });
    describe('experiment is not found', function() {
      beforeEach(setupController(false));
      it('loads the given experiment', function() {
        httpBackend.flush();
        expect(scope.experiment).toBe(null);
      });
    });
  });
});