angular.module('Coffee.controllers.Collections', [])

.controller('CollectionsController', function($scope, $http, $location, userInfo, currentProduct) {
    var vm = this;

    vm.items = [];

    // 获取收藏列表
    function getList () {
        alert(1);
        function _doGet(id) {
          alert(3);
          var listUrl = 'www.urcoffee.com/api/member/favorites/' + id + '.jhtml';
          $http.get(listUrl)
            .success(function (data) {
              if (data && 1 == data['result']) {
                vm.items = data['data'];
              }
            })
            .finally(function () {
            });
        }

        userInfo.getUserInfo($http, function () {
          alert(2);
          var infoData = userInfo.info;
          _doGet(infoData.id);
        });
    }
    vm.getList = getList;


    // 点击立即购买
    function buyIt(p) {
        currentProduct.setProduct(p);
        $location.path('/add_shopping_cart');
    }
    vm.buyIt = buyIt;
});