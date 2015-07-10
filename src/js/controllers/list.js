angular.module('Coffee.controllers.List', [])

.controller('ListController', function($scope, $http, globalData, userInfo) {
    var vm = this;

    vm.adImage = $scope.mainHost + 'images/ad4.jpg';

    vm.items = [];

    vm.type = null;

    vm.selectLevel = globalData.get('product_select_level');
    vm.selectArea = globalData.get('product_select_area');

    var saveAreas = globalData.get('product_areas');
    if (saveAreas) {
      vm.areas = saveAreas;
      vm.levels = globalData.get('product_levels');
      vm.selectLevel = vm.selectLevel || vm.levels[0];
      vm.selectArea = vm.selectArea || '';
      getList();
    }
    else {
      $http.get('http://www.urcoffee.com/api/product/levelAndArea.jhtml')
        .success(function (data) {
          if (data && data['attributes']) {
            globalData.set('product_areas', data["attributes"][0]["options"]);
            globalData.set('product_levels', data["attributes"][1]["options"]);

            vm.areas = globalData.get('product_areas');
            vm.levels = globalData.get('product_levels');
            vm.selectLevel = vm.selectLevel || vm.levels[0];
            getList();
          }
        })
        .finally(function () {
        });
    }

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

        vm.type = typeVal;

        var listUrl = 'http://www.urcoffee.com/api/product/list.jhtml';
        if (0 !== typeVal * 1) {
            listUrl = 'http://www.urcoffee.com/api/product/categoryProductList/' + typeVal +'.jhtml';
            if (1 == vm.type) {
              listUrl = ' http://www.urcoffee.com/api/product/beans.jhtml';
              var params = {
                'attribute_1': vm.selectArea,
                'attribute_2': vm.selectLevel
              };
              userInfo.postData($http, listUrl, params)
                .success(function (data) {
                  if (1 == data['result']) {
                    vm.items = data['data'];
                  }
                })
                .error(function () {
                });
            }
            else {
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
        }
    }

    vm.getList = getList;

    vm.doSelectLevel = function (v) {
      globalData.set('product_select_level', v);
      getList();
    };
});