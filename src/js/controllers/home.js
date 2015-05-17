angular.module('Coffee.controllers.Home', [])

.controller('HomeController', function($scope, $http) {
  var vm = this;

  vm.carouselIndex = 0;
  vm.slides = [
    'http://192.168.3.104:8008/images/ad1.jpg',
    'http://192.168.3.104:8008/images/ad2.jpg',
    'http://192.168.3.104:8008/images/ad3.jpg'
  ];
});