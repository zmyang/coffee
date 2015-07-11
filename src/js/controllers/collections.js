angular.module('Coffee.controllers.Collections', [])

.controller('CollectionsController', function($scope, $rootScope, $http, $location, userInfo, currentProduct, shoppingCart) {
    var vm = this;

    vm.items = [];

    // 获取收藏列表
    vm.getList = function getList () {
        userInfo.getUserInfo(function () {
          var infoData = userInfo.info;

          vm.items = infoData['favoriteProducts'];
        });
    };

    var joiningCart = false;
    function doAddCart(p, done) {
        if (joiningCart) {
          return;
        }
        joiningCart = true;
        if (!userInfo.openId) {
            alert('未能获取用户信息，请重新登陆。');
        }
        var params = {
            'wechatId': userInfo.openId,
            'id': p.id, 
            'quantity': 1,
            'processingPrice': 0
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

    // 点击立即购买
    vm.buyIt = function buyIt(p) {
        currentProduct.setProduct(p);
        if (p['attributeValue1']) {
            $location.path('/add_shopping_cart');
        }
        else {
            doAddCart(p, function () {
                $location.path('/pay_order');
            });
        }
    };
});