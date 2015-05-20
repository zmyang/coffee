angular.module('Coffee.controllers.Main', [])

.controller('MainController', function($scope){
  $scope.mainHost =  location.href.replace(location.hash, '');
});