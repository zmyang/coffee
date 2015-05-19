angular.module('Coffee.controllers.List', [])

.controller('ListController', function($scope, $http) {
    var vm = this;

    var typeReg = /type=([^&^$]+)/;
    var typeVal = typeReg.exec(location.hash)[1];
    console.log(typeVal);

    vm.adImage = $scope.mainHost + 'images/ad4.jpg';

    vm.items = [
        {
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50'
        },
        {
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50'
        },
        {
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50'
        },
        {
            'img': $scope.mainHost + 'images/p1.jpg',
            'desc': '精品意大利咖啡豆 新鲜中深度烘培 香醇浓厚',
            'price': '51.50'
        },
    ];
});