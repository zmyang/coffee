angular.module('Coffee.controllers.Detail', [])

.controller('DetailController', function($scope, $http, currentProduct, weixinBridge, userInfo) {
  var vm = this;

  vm.carouselIndex = 0;
  vm.slides = [];

  vm.productInfo = null;

  function getProductId (item) {
    var itemReg = /item=([^&^$]+)/;
    var itemVal;

    if (!item) {
        itemVal = itemReg.exec(location.hash)[1];
    }
    else {
        itemVal = item;
    }

    return itemVal;
  }

  function getDetail (item) {
      var itemVal = getProductId(item);

      var itemUrl = 'http://www.urcoffee.com/api/product/product/' + itemVal + '.jhtml';
      $http.get(itemUrl)
        .success(function (data) {
          if (data && 1 == data['result']) {
              vm.productInfo = data['data'];
              vm.productInfo.buy_num = 1;
              vm.slides = vm.productInfo['productImages'] ? vm.productInfo['productImages']  : [{
                'medium': vm.productInfo['image']
              }];

              currentProduct.setProduct(vm.productInfo);
          }
        })
        .finally(function () {
        });
  }

  vm.getDetail = getDetail;


  function buyIt () {
    weixinBridge.config($http, window.location.href, function() {
      weixinBridge.pay($http, userInfo.openId, new Date().getTime());
    });
  }

  vm.buyIt = buyIt;

  function collectProduct() {
    var itemVal = getProductId(item);
    var addUrl = 'http://www.urcoffee.com/api/member/addFavorite.jhtml';
    var params = {
      wechatId: userInfo.openId,
      id: itemVal
    };


    userInfo.postData($http, addUrl, params)
      .success(function (data) {
        if (1 == data['result']) {
          alert('收藏成功!');
        }
        else {
          alert('收藏失败!');
        }
      })
      .error(function () {
        alert('收藏失败!');
      })
      .finally(function () {
      });

  }
  vm.collectProduct = collectProduct;
});
