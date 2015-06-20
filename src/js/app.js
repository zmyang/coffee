angular.module('Coffee', [
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
  $routeProvider.when('/group_purchase', {
    templateUrl: 'group_purchase.html',
    controller: 'GroupPurchaseController',
    controllerAs: 'vm',
    reloadOnSearch: false
  });
})

.service('currentProduct', function () {
    var curProduct = null;

    return {
        getProduct: function() {
            return curProduct;
        },
        setProduct: function(p) {
            curProduct = p;
        },
        clearProduct: function() {
            curProduct = null;
        }
    }
})

.service('shoppingCart', function () {
    var shoppingCart = {
      'products': []
    };

    return {
        getCart: function () {
            return shoppingCart;
        },
        joinCart: function (p) {
            var productIndex = this.checkIndex(p['product_id']);
            if (typeof productIndex !== 'number') {
              shoppingCart['products'].push(p);
            }
        },
        deleteCart: function (id) {
            var productIndex = this.checkIndex(id);
            if (typeof productIndex === 'number') {
                shoppingCart['products'].splice(productIndex, 1);
            }
        },
        clearCart: function () {
            shoppingCart['products'] = [];
        },
        checkIndex: function (id) {
            for (var i = shoppingCart['products'].length - 1; i >= 0; i--) {
                if (shoppingCart['products'][i] && shoppingCart['products'][i]['product_id'] == id) {
                  return i;
                }
            }
            return null;
        }
    }
});