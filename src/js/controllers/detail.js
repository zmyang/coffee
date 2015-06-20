angular.module('Coffee.controllers.Detail', [])

.controller('DetailController', function($scope, $http, currentProduct) {
  var vm = this;

  vm.attend = function() {
    alert('关注');
  };

  vm.carouselIndex = 0;
  vm.slides = [
    {
        'img': $scope.mainHost + 'images/p1.jpg'
    },
    {
        'img': $scope.mainHost + 'images/p1.jpg'
    },
    {
        'img': $scope.mainHost + 'images/p1.jpg'
    }
  ];

  vm.productInfo = {
    'name': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚'
  };

  currentProduct.setProduct(vm.productInfo);
});
