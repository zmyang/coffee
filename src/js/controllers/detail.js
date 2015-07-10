angular.module('Coffee.controllers.Detail', [])

.controller('DetailController', function($scope, $rootScope, $http, $location, currentProduct, shoppingCart, userInfo) {
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

  var typeReg = /type=([^&^$]+)/;
  try {
    vm.type = typeReg.exec(location.hash)[1];
  }
  catch (e) {
    vm.type = 2;
  }

  function getDetail (item) {
      var itemVal = getProductId(item);

      var itemUrl = 'http://www.urcoffee.com/api/product/product/' + itemVal + '.jhtml';
      $http.get(itemUrl)
        .success(function (data) {
          if (data && 1 == data['result']) {
              vm.productInfo = data['data'];
              vm.productInfo.buy_num = 1;
              vm.productInfo.type = vm.type;
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


  var joiningCart = false;
  function doAddCart(done) {
    if (joiningCart) {
      return;
    }
    joiningCart = true;
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    var params = {
        'wechatId': userInfo.openId,
        'id': vm.productInfo.id, 
        'quantity': 1,
        'processingPrice': 0
    };
    shoppingCart.add($http, params, function (data) {
      if (data && 1 == data['result']) {
        $rootScope.hasCart = true;
      }
      else {
        $rootScope.hasCart = false;
      }
      done && done();
    }, function () {
      joiningCart = false;
    });
  }


  function buyIt () {
    vm.productInfo['detail_action'] = 'buyIt';
    currentProduct.setProduct(vm.productInfo);

    if (2 == vm.type) {
      doAddCart(function () {
        $location.path('/pay_order');
      });
    }
    else {
      $location.path('/add_shopping_cart');
    }

  }

  vm.buyIt = buyIt;


  function addCart () {
    vm.productInfo['detail_action'] = 'addCart';
    currentProduct.setProduct(vm.productInfo);

    if (2 == vm.type) {
      doAddCart(function () {
        $location.path('/edit_shopping_cart');
      });

      alert(JSON.stringify(params));
    }
    else {
      $location.path('/add_shopping_cart');
    }
  }

  vm.addCart = addCart;

  function collectProduct() {
    var itemVal = getProductId();
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
          alert(data['msg']['content'] || '收藏失败!');
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
