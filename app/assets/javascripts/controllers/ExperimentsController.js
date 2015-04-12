(function(){
  var controllers = angular.module('controllers');

  controllers.controller("ExperimentsController", [
    '$scope', '$routeParams', '$location', '$resource', function($scope, $routeParams, $location, $resource) {
      var keywords;
      $scope.search = function(keywords) {
        return $location.path("/").search('keywords', keywords);
      };

      var Experiment;
      Experiment = $resource('/experiments/:experimentId', {
        experimentId: "@id",
        format: 'json'
      });

      if ($routeParams.keywords) {
        Experiment.query({
          keywords: $routeParams.keywords
        }, function(results) {
          return $scope.experiments = results;
        });
      } else {
        return $scope.experiments = [];
      }
    }
  ]);
})();
