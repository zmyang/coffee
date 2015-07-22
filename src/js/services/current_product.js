Coffee_App.service('currentProduct', function ($http, $rootScope) {
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
        },
        getBakingPrice: function (data, done) {
            $rootScope.ajaxDataLoading = true;
            $http({
                method: 'POST',
                url: 'http://www.urcoffee.com/api/order/processingFee.jhtml',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            })
            .success(function (data) {
                if (1 == data['result']) {
                    done && done(data['data']);
                }
            })
            .finally(function () {
                $rootScope.ajaxDataLoading = false;
            });
        }
    }
});