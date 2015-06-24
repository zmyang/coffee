angular.module('Coffee.controllers.List', [])

.controller('ListController', function($scope, $http) {
    var vm = this;

    var typeReg = /type=([^&^$]+)/;
    var typeVal = typeReg.exec(location.hash)[1];
    console.log(typeVal);

    vm.adImage = $scope.mainHost + 'images/ad4.jpg';

    vm.items = [
        {
            'id': 1,
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50',
            'payedNum': 88
        },
        {
            'id': 2,
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50',
            'payedNum': 88
        },
        {
            'id': 3,
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50',
            'payedNum': 88
        },
        {
            'id': 4,
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50',
            'payedNum': 89
        },
    ];

    // 产品列表
    vm.items = [];
    $http.get('http://www.urcoffee.com/api/product/list.jhtml')
      .success(function (data) {
        if (data && 1 == data['result']) {
          vm.items = data['data']['content'];
        }
      })
      .finally(function () {
      });
});