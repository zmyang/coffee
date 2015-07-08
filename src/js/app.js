var Coffee_App = angular.module('Coffee', [
  'ngRoute',
  'mobile-angular-ui',
  'angular-carousel',
  'Coffee.controllers.Main',
  'Coffee.controllers.Home',
  'Coffee.controllers.List',
  'Coffee.controllers.Area',
  'Coffee.controllers.Detail',
  'Coffee.controllers.Account',
  'Coffee.controllers.AddShoppingCart',
  'Coffee.controllers.EditShoppingCart',
  'Coffee.controllers.MemberShip',
  'Coffee.controllers.GroupPurchase',
  'Coffee.controllers.Collections',
  'Coffee.controllers.OrderDetail',
  'Coffee.controllers.PayOrder',
])

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'AccountController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/reg', {
    templateUrl: 'reg.html',
    controller: 'AccountController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/list', {
    templateUrl: 'list.html',
    controller: 'ListController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/list2', {
    templateUrl: 'list.html',
    controller: 'ListController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/list3', {
    templateUrl: 'list.html',
    controller: 'ListController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/area', {
    templateUrl: 'area.html',
    controller: 'AreaController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/detail', {
    templateUrl: 'detail.html',
    controller: 'DetailController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/add_shopping_cart', {
    templateUrl: 'add_shopping_cart.html',
    controller: 'AddShoppingCartController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/edit_shopping_cart', {
    templateUrl: 'edit_shopping_cart.html',
    controller: 'EditShoppingCartController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });

  $routeProvider.when('/member_ship', {
    templateUrl: 'member_ship.html',
    controller: 'MemberShipController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/member_info', {
    templateUrl: 'member_info.html',
    controller: 'MemberShipController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/orders', {
    templateUrl: 'orders.html',
    controller: 'MemberShipController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/order_detail', {
    templateUrl: 'order_detail.html',
    controller: 'OrderDetailController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/pay_order', {
    templateUrl: 'pay_order.html',
    controller: 'PayOrderController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/group_purchase', {
    templateUrl: 'group_purchase.html',
    controller: 'GroupPurchaseController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/collections', {
    templateUrl: 'collections.html',
    controller: 'CollectionsController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
  $routeProvider.when('/your_coffee', {
    templateUrl: 'your_coffee.html',
    reloadOnSearch: false
  });
});