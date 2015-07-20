angular.module('Coffee.controllers.Main', [])

.controller('MainController', function ($scope, $rootScope, $location, $http, userInfo, shoppingCart) {
    $scope.mainHost = /^http/.test(location.href) ? location.href.replace(location.hash, '') : '';

    $scope.pageBack = function () {
        window.history.back();
    };

    $scope.go = function (path, isHash) {
        if (isHash) {
            $location.hash(path);
        } else {
            $location.path(path);
        }
    };

    userInfo.getOpenId(function () {
        // 获取购物车，有的话显示提示
        shoppingCart.getCart(function (data) {
            if (data && data.length > 0) {
                $rootScope.hasCart = true;
            }
            else {
                $rootScope.hasCart = false;
            }

        }, userInfo.openId);
    });

        // 刷新view
    function refreshView() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    $rootScope.refreshView = refreshView;

    $scope.customerService = function () {
        var cUrl = 'http://www.urcoffee.com/api/wechat/sendServiceMsg.jhtml';
        userInfo.getOpenId(function () {
            $http({
                method: 'POST',
                url: cUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    openid: userInfo.openId
                }
            });
        });
    };

    $rootScope.ajaxDataLoading = false;

});