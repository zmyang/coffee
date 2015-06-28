angular.module('Coffee.controllers.Detail', [])

.controller('DetailController', function($scope, $http, currentProduct, weixinBridge) {
  var vm = this;

  vm.attend = function() {
    alert('关注');
  };

  vm.carouselIndex = 0;
  vm.slides = [];

  vm.productInfo = {
    'name': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚'
  };

  var itemReg = /item=([^&^$]+)/;
  function getDetail (item) {
      var itemVal;
      if (!item) {
          itemVal = itemReg.exec(location.hash)[1];
      }
      else {
          itemVal = item;
      }

      var itemUrl = 'http://www.urcoffee.com/api/product/product/' + itemVal + '.jhtml';
      $http.get(itemUrl)
        .success(function (data) {
          if (data && 1 == data['result']) {
              vm.productInfo = data['data'];
              vm.slides = vm.productInfo['productImages'] ? vm.productInfo['productImages']  : [{
                'medium': vm.productInfo['image']
              }]
          }
        })
        .finally(function () {
        });
  }

  vm.getDetail = getDetail;


  function buyIt () {
    weixinBridge.config($http, window.location.href);
  }

  vm.buyIt = buyIt;
  currentProduct.setProduct(vm.productInfo);
});
