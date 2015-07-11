angular.module('Coffee.controllers.AddReceiver', [])

.controller('AddReceiverController', function($scope, $location, userInfo) {
    var vm = this;
    var inputMap = {
        'addName': '收货人',
        'addPhone': '手机号码',
        'addRegion': '地区信息',
        'addAddress': '详细地址',
        'addPostCode': '邮政编码'
    }

    // 添加收货地址
    function addReceiver () {
        for (var name in inputMap) {
            if (!vm[name]) {
                alert('请输入' + inputMap[name]);
                return;
            }
        }

        var addUrl = 'http://www.urcoffee.com/api/member/receiver.jhtml';

        userInfo.postData(addUrl, {
                memberId: userInfo.openId,
                consignee: vm['addName'],
                areaId: vm['addRegionId'], 
                address: vm['addAddress'],
                zipCode: vm['addPostCode'],
                phone: vm['addPhone'],
                isDefault: false
            })
              .success(function () {
                if (1 == data['result']) {
                    $location.path('/select_receiver');
                }
              })
              .error(function () {
                alert('添加收货地址失败!');
              })
              .finally(function () {
              });
    }

    vm.addReceiver = addReceiver;


    vm.addRegion = "";
    vm.addRegionId = null;
    vm.provinceList = [];
    // 选择地区
    function getProvinceList () {
        vm.addRegion = "";
        vm.addRegionId = null;
        userInfo.getProvinces(function (data) {
            vm.provinceList = data;
        });
    }

    vm.getProvinceList = getProvinceList;

    var selectFinished = false;
    var preId = null;
    function selectRegion (r) {
        if (r.id == preId) {
            return;
        }
        if (selectFinished) {
            vm.addRegion = vm.addRegion ? vm.addRegion.replace(/\s+[^\s]*$/,'') + ' ' + r.name : r.name;
        }
        else {
            vm.addRegion = vm.addRegion ? vm.addRegion + ' ' + r.name : r.name;
        }
        vm.addRegionId = r.id;
        preId = r.id;

        userInfo.getChildAreas(r.id, function (data) {
            if (data) {
                vm.provinceList = data;
                selectFinished = false;
            }
            else {
                selectFinished = true;
            }
        }, function () {
            selectFinished = true;
        });
    }

    vm.selectRegion = selectRegion;
});
