angular.module('Coffee.controllers.Area', [])

.controller('AreaController', function($scope, $http, globalData) {
  var vm = this;

  // var areaData = {
  //   "attributes": [
  //     {
  //       "id":1,
  //       "createDate":1432706876000,
  //       "modifyDate":1432710090000,
  //       "order":1,
  //       "name":"地区",
  //       "options": ["中国","台湾","越南","印度","苏门答腊岛","爪哇岛","葉门","衣索比亚","肯亚","刚果","巴西","哥伦比亚","尼加拉瓜","哥斯达尼加","瓜地马拉"]
  //     },
  //     {
  //       "id":2,
  //       "createDate":1430279793000,
  //       "modifyDate":1432710083000,
  //       "order":2,
  //       "name":"等级分类",
  //       "options":["精品","高级商业","商业"]
  //     }
  //   ]
  // };

  // vm.levels = areaData["attributes"][1]["options"];
  // vm.areas = areaData["attributes"][0]["options"];

  // 等级和地区
  // vm.areas = [];
  var saveAreas = globalData.get('product_areas');
  if (saveAreas) {
    vm.areas = saveAreas;
  }
  else {
    $http.get('http://www.urcoffee.com/api/product/levelAndArea.jhtml')
      .success(function (data) {
        if (data && data['attributes']) {
          globalData.set('product_areas', data["attributes"][0]["options"]);
          vm.areas = globalData.get('product_areas');
        }
      })
      .finally(function () {
      });
  }
});