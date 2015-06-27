angular.module('Coffee.controllers.Main', [])

.controller('MainController', function ($scope, $location, $http, userInfo) {
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

    userInfo.getOpenId($http);
});