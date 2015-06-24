Coffee_App.service('currentProduct', function () {
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
});