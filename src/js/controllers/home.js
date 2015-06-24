angular.module('Coffee.controllers.Home', [])

.controller('HomeController', function($scope, $http, globalData) {
  var vm = this;

  vm.carouselIndex = 0;

  // 轮播广告
  vm.slides = [];
  var saveBanner = globalData.get('home_banner');
  if (saveBanner) {
    vm.slides = saveBanner;
  }
  else {
    $http.get('http://www.urcoffee.com/api/banner/list.jhtml')
      .success(function (data) {
        if (data && 1 == data['result']) {
          vm.slides = data['data'];
          globalData.set('home_banner', vm.slides);
        }
      })
      .finally(function () {
      });
  }

  // 等级和地区
  vm.levels = [];
  var saveLevel = globalData.get('product_level');
  if (saveLevel) {
    vm.levels = saveLevel;
  }
  else {
    $http.get('http://www.urcoffee.com/api/product/levelAndArea.jhtml')
      .success(function (data) {
        if (data && data['attributes']) {
          vm.levels = data['attributes'][1]['options'];
          var areas = data['attributes'][0]['options'];
          globalData.set('product_areas', vm.areas);
        }
      })
      .finally(function () {
      });
  }


});