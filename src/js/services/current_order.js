Coffee_App.service('currentOrder', function ($http, $rootScope) {
    var currentOrder = null;

    return {
        getOrder: function() {
            return currentOrder;
        },
        setOrder: function(p) {
            currentOrder = p;
        },
        confirmOrder: function(o, done) {
            $rootScope.ajaxDataLoading = true;
            $http({
                method: 'POST',
                url: 'http://www.urcoffee.com/api/order/confirmReceipt.jhtml',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    sn: o.sn
                }
            })
            .success(function (data) {
                if (1 == data['result']) {
                    done && done();
                }
            })
            .finally(function () {
                $rootScope.ajaxDataLoading = false;
            });
        },
        clearOrder: function() {
            currentOrder = null;
        }
    }
});