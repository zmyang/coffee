angular.module('Coffee', [
  'ngRoute',
  'mobile-angular-ui',
  'angular-carousel',
  'Coffee.controllers.Main',
  'Coffee.controllers.Home',
  'Coffee.controllers.List',
])

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl:'home.html',
    controller: 'HomeController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/list', {
    templateUrl:'list.html',
    controller: 'ListController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
});