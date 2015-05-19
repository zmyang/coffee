angular.module('Coffee.controllers.Main', [])

.controller('MainController', function($scope){
  $scope.mainHost =  'http://' + location.href.replace(location.hash, '') + '/';
});