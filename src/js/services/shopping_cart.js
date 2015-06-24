Coffee_App.service('shoppingCart', function () {
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