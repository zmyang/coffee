angular.module('Coffee.controllers.AddShoppingCart', [])

.controller('AddShoppingCartController', function($scope, $http, $location, currentProduct, shoppingCart, userInfo) {
  var vm = this;

  vm.productInfo = currentProduct.getProduct();

  vm.cook_deeps = ['浅焙', '中浅焙', '中焙', '中深焙', '深焙'];
  vm.grind_deeps = ['细', '极细', '粗'];

  vm.joinCart = function () {
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    var addUrl = 'http://www.urcoffee.com/api/cart/add.jhtml';
    var params = {
        'id': userInfo.openId, 
        'quantity': vm.productInfo.buy_num,
        'baking': vm.productInfo.grind,
        'bakingStage': vm.productInfo.select_cook_deep,
        'processingCount': vm.productInfo.cook_num,
        'processingPrice': ''
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
      });
    // shoppingCart.joinCart(productInfo);
  };

  vm.buyIt = function () {
    weixinBridge.config($http, window.location.href, function() {
      weixinBridge.pay($http, userInfo.openId, new Date().getTime());
    });
  };

});