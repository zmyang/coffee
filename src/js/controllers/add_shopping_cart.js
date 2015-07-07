angular.module('Coffee.controllers.AddShoppingCart', [])

.controller('AddShoppingCartController', function($scope, $http, $location, currentProduct, shoppingCart, userInfo) {
  var vm = this;

  vm.productInfo = currentProduct.getProduct();

  vm.cook_deeps = ['浅焙', '中浅焙', '中焙', '中深焙', '深焙'];
  vm.grind_deeps = ['细', '极细', '粗'];

  vm.productInfo.buy_num = 1;
  vm.productInfo.select_cook_deep = '浅焙';

  var joiningCart = false;
  vm.joinCart = function () {
    if (joiningCart) {
      return;
    }
    joiningCart = true;
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    var addUrl = 'http://www.urcoffee.com/api/cart/add.jhtml';
    var params = {
        'wechatId': userInfo.openId,
        'id': vm.productInfo.id, 
        'quantity': vm.productInfo.buy_num,
        'baking': ['否', '是'][vm.productInfo.grind || 0],
        'bakingStage': vm.productInfo.select_cook_deep,
        'processingCount': vm.productInfo.cook_num || 0,
        'processingPrice': 0
    };

    alert(JSON.stringify(params));

    userInfo.postData($http, addUrl, params)
      .success(function (data) {
        $location.path('/edit_shopping_cart');
      })
      .error(function () {
        alert('加入购物车失败!');
      })
      .finally(function () {
        joiningCart = false;
      });
  };

  vm.buyIt = function () {
    weixinBridge.config($http, window.location.href, function() {
      weixinBridge.pay($http, userInfo.openId, new Date().getTime());
    });
  };

});