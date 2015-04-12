(function(){
  var diatomic = angular.module('diatomic',[
    'templates',
    'ngRoute',
    'ngResource',
    'controllers'
  ]);

  diatomic.config(['$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
          templateUrl: "index.html",
          controller: 'ExperimentsController'
        }).when('/experiments/:experimentId', {
          templateUrl: "show.html",
          controller: 'ExperimentsController'
        });
    }
  ]);

  var controllers = angular.module('controllers',[]);
})();