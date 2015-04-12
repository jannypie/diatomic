require 'spec_helper'

describe("ExperimentsController", function() {
  var ctrl, location, resource, routeParams, scope, setupController;
  scope = null;
  ctrl = null;
  location = null;
  routeParams = null;
  resource = null;
  setupController = function(keywords) {
    return inject(function($location, $routeParams, $rootScope, $resource, $controller) {
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      routeParams = $routeParams;
      routeParams.keywords = keywords;
      return ctrl = $controller('ExperimentsController', {
        $scope: scope,
        $location: location
      });
    });
  };
  beforeEach(module("diatomic"));
  beforeEach(setupController());
  return it('defaults to no experiments', function() {
    return expect(scope.experiments).toEqualData([]);
  });
});