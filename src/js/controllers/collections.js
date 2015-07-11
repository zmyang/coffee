angular.module('Coffee.controllers.Collections', [])

.controller('CollectionsController', function($scope, $http, $location, userInfo, currentProduct) {
    var vm = this;

    vm.items = [];

    // 获取收藏列表
    vm.getList = function getList () {
        userInfo.getUserInfo(function () {
          var infoData = userInfo.info;

          vm.items = infoData['favoriteProducts'];
        });
    };

    // 点击立即购买
    vm.buyIt = function buyIt(p) {
        currentProduct.setProduct(p);
        $location.path('/add_shopping_cart');
    };
});