angular.module('Coffee.controllers.AddShoppingCart', [])

.controller('AddShoppingCartController', function($scope, $http, $location, currentProduct, shoppingCart, userInfo) {
  var vm = this;

  vm.productInfo = currentProduct.getProduct();

  vm.isAddCart = false;

  if ('addCart' == vm.productInfo['detail_action']) {
    vm.isAddCart = true;
  }

  vm.baking_deeps = ['浅焙', '中浅焙', '中焙', '中深焙', '深焙'];
  vm.grind_deeps = ['细', '极细', '粗'];

  vm.productInfo.buy_num = 1;
  vm.productInfo.baking_num = 0;
  vm.productInfo.select_baking_deep = '浅焙';

  function setCartVal() {
    vm.productInfo.buy_num = vm.productInfo.buy_num || 1;
    vm.productInfo.baking_value = ['否', '是'][vm.productInfo.baking || 0];
    vm.productInfo.select_baking_deep = vm.productInfo.select_baking_deep || '浅焙';
    vm.productInfo.baking_num = vm.productInfo.baking_num || 0;
  }

  var joiningCart = false;
  vm.joinCart = function () {
    if (joiningCart) {
      return;
    }
    joiningCart = true;
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    setCartVal();
    var params = {
        'wechatId': userInfo.openId,
        'id': vm.productInfo.id, 
        'quantity': vm.productInfo.buy_num,
        'baking': vm.productInfo.baking_value,
        'bakingStage': vm.productInfo.select_baking_deep,
        'processingCount': vm.productInfo.baking_num,
        'processingPrice': 0
    };
    shoppingCart.add($http, params, function () {
      $location.path('/edit_shopping_cart');
    }, function () {
      joiningCart = false;
    });

  };

  vm.buyIt = function () {
    setCartVal();

    currentProduct.setProduct(vm.productInfo);

    $location.path('/pay_order');
    // weixinBridge.config($http, window.location.href, function() {
    //   weixinBridge.pay($http, userInfo.openId, new Date().getTime());
    // });
  };

});