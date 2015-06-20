angular.module('Coffee.controllers.AddShoppingCart', [])

.controller('AddShoppingCartController', function($scope, $http, currentProduct, shoppingCart) {
  var vm = this;

  // vm.productInfo = currentProduct.getProduct();
  var productInfo = {
    'be_selected': true,
    'product_id': 1,
    'name': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
    'shop_name': 'Urcoffee  麦啡商城',
    'img': $scope.mainHost + 'images/p1.jpg',
    'price': 64.35,
    'weight_items': ['220g', '230g', '240g'],
    'buy_num': 1,
    'grind': false,
    'grind_deeps': ['细', '极细', '粗'],
    'cook': false,
    'cook_num': 1,
    'cook_deeps': ['浅焙', '中浅焙', '中焙', '中深焙', '深焙']
  };

  vm.productInfo = productInfo;

  vm.joinCart = function () {
    shoppingCart.joinCart(productInfo);
  };

});
