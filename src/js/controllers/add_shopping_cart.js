angular.module('Coffee.controllers.AddShoppingCart', [])

.controller('AddShoppingCartController', function($scope, $rootScope, $location, currentProduct, shoppingCart, userInfo) {
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
  vm.productInfo.baking_price = 0;

  function setCartVal () {
    vm.productInfo.buy_num = vm.productInfo.buy_num || 1;
    vm.productInfo.baking_value = vm.productInfo.baking ? '是' : '否';
    vm.productInfo.select_baking_deep = vm.productInfo.select_baking_deep || '浅焙';
    vm.productInfo.baking_num = vm.productInfo.baking_num || 0;
  }

  $scope.$watch('vm.productInfo.buy_num', function() {
    if (vm.productInfo.baking_num > vm.productInfo.buy_num) {
      vm.productInfo.baking_num = vm.productInfo.buy_num;
    }
  });

  function calculBakingPrice () {
    if (vm.productInfo.baking) {
      currentProduct.getBakingPrice({
          productId: vm.productInfo.id,
          processingCount: vm.productInfo.baking_num
        }, function (data) {
          vm.productInfo.baking_price = data;
      });
    }
    else {
          vm.productInfo.baking_price = 0;
    }
  }

  $scope.$watch('vm.productInfo.baking_num', function() {
    calculBakingPrice();
  });

  $scope.$watch('vm.productInfo.baking', function() {
    calculBakingPrice();
  });

  var joiningCart = false;

  function doJoinCart (done) {
    if (joiningCart) {
      return;
    }
    joiningCart = true;
    if (!userInfo.openId) {
        alert('未能获取用户信息，请重新登陆。');
    }
    setCartVal();
    var params = {
        'openid': userInfo.openId,
        'id': vm.productInfo.id, 
        'quantity': vm.productInfo.buy_num,
        'baking': vm.productInfo.baking_value,
        'bakingStage': vm.productInfo.select_baking_deep,
        'processingCount': vm.productInfo.baking_num,
        'processingPrice': vm.productInfo.baking_price || 0
    };
    shoppingCart.add(params, function (data) {
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

  vm.joinCart = function () {
    doJoinCart(function () {
      $location.path('/edit_shopping_cart');
    });
  };

  vm.buyIt = function () {
    setCartVal();

    currentProduct.setProduct(vm.productInfo);

    doJoinCart(function () {
      $location.path('/pay_order');
    });
  };

});