angular.module('Coffee.controllers.Home', [])

.controller('HomeController', function($scope, $http) {
  var vm = this;

  vm.carouselIndex = 0;
  vm.slides = [
    {
        'img': $scope.mainHost + 'images/ad1.jpg'
    },
    {
        'img': $scope.mainHost + 'images/ad1.jpg'
    },
    {
        'img': $scope.mainHost + 'images/ad1.jpg'
    }
  ];
});