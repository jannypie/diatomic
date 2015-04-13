(function(){
  var controllers = angular.module('controllers');

  controllers.controller("SearchController", [
    '$scope', '$routeParams', '$location', '$resource', function($scope, $routeParams, $location, $resource) {

      var Experiment, keywords;

      $scope.search = function(keywords) {
        return $location.path("/").search('keywords', keywords);
      };

      Experiment = $resource('/experiments/:experimentId', {
        experimentId: "@id",
        format: 'json'
      });

      if ($routeParams.keywords) {
        Experiment.query({
          keywords: $routeParams.keywords
        }, function(experiments) {
          $scope.experiments = experiments;
        });
      } else {
        $scope.experiments = [];
      };

      $scope.view = function(experimentId) {
        return $location.url("/experiments/" + experimentId);
      };

      $scope.newExperiment = function() {
        return $location.path("/experiments/new");
      };

      $scope.edit = function(experimentId) {
        return $location.path("/experiments/" + experimentId + "/edit");
      };

    }
  ]);
})();
