angular.module('Coffee.controllers.List', [])

.controller('ListController', function($scope, $http) {
    var vm = this;

    vm.adImage = $scope.mainHost + 'images/ad4.jpg';

    vm.items = [];

    vm.type = null;

    var typeReg = /type=([^&^$]+)/;
    // 获取产品列表
    function getList (type) {
        var typeVal;
        if (!type) {
            typeVal = typeReg.exec(location.hash)[1];
        }
        else {
            typeVal = type;
        }

        vm.type = typeVal

        var listUrl = 'http://www.urcoffee.com/api/product/list.jhtml';
        if (0 !== typeVal * 1) {
            listUrl = 'http://www.urcoffee.com/api/product/categoryProductList/' + typeVal +'.jhtml';
        }
        $http.get(listUrl)
          .success(function (data) {
            if (data && 1 == data['result']) {
              if (0 !== typeVal * 1) {
                vm.items = data['data'];
              } else {
                vm.items = data['data']['content'];
              }
            }
          })
          .finally(function () {
          });
    }
    getList();

    vm.getList = getList;
});