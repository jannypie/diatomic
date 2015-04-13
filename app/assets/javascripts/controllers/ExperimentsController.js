(function(){
  var controllers = angular.module('controllers');

  controllers.controller("ExperimentsController", [
    '$scope', '$routeParams', '$location', '$resource', function($scope, $routeParams, $location, $resource) {

      var Experiment = $resource('/experiments/:experimentId.json', {
        experimentId: "@id"
      }, {
        'save': {
          method: 'PUT'
        },
        'create': {
          method: 'POST'
        }
      });

      if ($routeParams.experimentId) {
        Experiment.get({
          experimentId: $routeParams.experimentId
        }, (function(experiment) {
          return $scope.experiment = experiment;
        }), (function(httpResponse) {
          return $scope.experiment = null;
        }));
      } else {
        $scope.experiment = {};
      };

      $scope.back = function() {
        return $location.path("/");
      };

      $scope.edit = function() {
        return $location.path("/experiments/" + $scope.experiment.id + "/edit");
      };
      $scope.cancel = function() {
        if ($scope.experiment.id) {
          return $location.path("/experiments/" + $scope.experiment.id);
        } else {
          return $location.path("/");
        }
      };
      $scope.save = function() {
        var onError;
        onError = function(_httpResponse) {
          return flash.error = "Something went wrong";
        };
        if ($scope.experiment.id) {
          return $scope.experiment.$save((function() {
            return $location.path("/experiments/" + $scope.experiment.id);
          }), onError);
        } else {
          return Experiment.create($scope.experiment, (function(newExperiment) {
            return $location.path("/experiments/" + newExperiment.id);
          }), onError);
        }
      };

      return $scope["delete"] = function() {
        $scope.experiment.$delete();
        return $scope.back();
      };

    }
  ]);
})();
