angular.module('Coffee.controllers.Collections', [])

.controller('CollectionsController', function($scope, $http, userInfo) {
    var vm = this;

    vm.items = [];

    // 获取收藏列表
    function getList () {
        function _doGet(id) {
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
        userInfo.getOpenId($http, function () {
            userInfo.getUserInfo($http, function () {
              var infoData = userInfo.info;
              _doGet(infoData.id);
            }, noLogin) ;
        }, noLogin);
    }
    vm.getList = getList;

});