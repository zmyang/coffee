Coffee_App.service('shoppingCart', function ($http) {
    var shoppingCart = {
      'products': [],
      'receiver': null
    };

    return {
        getCart: function (done, openid, force) {
            if (!force && shoppingCart['products'].length > 0) {
                done && done(shoppingCart['products']);
            }
            else {
                var listUrl = 'http://www.urcoffee.com/api/cart/list/' + openid + '.jhtml';

                $http.get(listUrl)
                  .success(function (data) {
                    if (1 == data['result']) {
                      shoppingCart['products'] = data['data'] || [];
                      done && done(shoppingCart['products']);
                    }
                    else {
                      alert('获取购物车失败!');
                    }
                  })
                  .error(function () {
                    alert('获取购物车失败!');
                  });
            }
        },
        add: function (p, done, finalFn) {
            var addUrl = 'http://www.urcoffee.com/api/cart/add.jhtml';

            this.postData(addUrl, p)
              .success(function (data) {
                done&&done(data);
              })
              .error(function () {
                alert('加入购物车失败!');
              })
              .finally(function () {
                finalFn&&finalFn();
              });
        },
        setReceiver: function (r) {
            shoppingCart['receiver'] = r;
        },
        getReceiver: function () {
            return shoppingCart['receiver'];
        },
        // checkIndex: function (id) {
        //     for (var i = shoppingCart['products'].length - 1; i >= 0; i--) {
        //         if (shoppingCart['products'][i] && shoppingCart['products'][i]['product_id'] == id) {
        //           return i;
        //         }
        //     }
        //     return null;
        // },
        postData: function (url, data) {
            return $http({
                method: 'POST',
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data
            })
        }
    }
});