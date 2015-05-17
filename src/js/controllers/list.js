angular.module('Coffee.controllers.List', [])

.controller('ListController', function($scope, $http) {
    var vm = this;

    var typeReg = /type=([^&^$]+)/;
    var typeVal = typeReg.exec(location.hash)[1];
    console.log(typeVal);
});