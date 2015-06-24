Coffee_App.service('globalData', function () {
    var globalData = {};

    return {
        get: function(name) {
            return globalData[name];
        },
        set: function(name, value) {
            globalData[name] = value;
        },
        clear: function(name) {
            if (name) {
                globalData[name] = null;
            }
            else {
                globalData = {};
            }
        }
    }
});