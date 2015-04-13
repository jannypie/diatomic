(function(){
  var diatomic = angular.module('diatomic',[
    'templates',
    'ngRoute',
    'ngResource',
    'controllers'
  ]);

  diatomic.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "index.html",
        controller: 'SearchController'
      })
      .when('/experiments/new', {
        templateUrl: "experiments/form.html",
        controller: 'ExperimentsController'
      })
      .when('/experiments/:experimentId', {
        templateUrl: "experiments/show.html",
        controller: 'ExperimentsController'
      }).when('/experiments/:experimentId/edit', {
        templateUrl: "experiments/form.html",
        controller: 'ExperimentsController'
      });
    }
  ]);

  var controllers = angular.module('controllers',[]);
})();