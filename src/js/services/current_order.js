Coffee_App.service('currentOrder', function () {
    var currentOrder = null;

    return {
        getOrder: function() {
            return currentOrder;
        },
        setOrder: function(p) {
            currentOrder = p;
        },
        clearOrder: function() {
            currentOrder = null;
        }
    }
});