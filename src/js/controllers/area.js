angular.module('Coffee.controllers.Area', [])

.controller('AreaController', function($scope, $http, globalData) {
  var vm = this;

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