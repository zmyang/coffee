Coffee_App.filter('unsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };
});

Coffee_App.filter('money', function() {
  return function(val) {
    if (!val) {
      return 0;
    }
    return +(val || 0)/100;
  };
});

Coffee_App.filter('humanDate', function() {
  return function(val) {
    if (!val) {
        return '';
    }
    var retStr = '';
    var d = new Date(val);

    retStr = [d.getFullYear(), (d.getMonth() + 1), d.getDate()].join('-');
    retStr += ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

    return retStr;
  };
});

Coffee_App.filter('kilometer', function() {
  return function(val) {
    var reVal;
    if (!val) {
        val = 0;
    }
    reVal = Math.round(val / 100) / 10;
    return !val ? '小于0.1' : reVal;
  }
});

Coffee_App.filter('hideTell', function() {
  return function(val) {
    if (!val) {
      return '匿名';
    }
    val = '' + val;
    return val.substring(0, 3) + '****' + val.substring(val.length - 4);
  }
});

Coffee_App.filter('length10', function() {
  return function(val) {
    if (!val) {
      return '';
    }
    val = '' + val;
    if (val.length <= 10) {
      return val;
    }
    return val.substring(0, 10) + '...';
  }
});

Coffee_App.filter('ceilNum', function() {
  return function(val) {
    if (!val) {
      return '';
    }
    return Math.round(val);
  }
});

Coffee_App.filter('killYear', function() {
  return function(val) {
    if (!val) {
      return '';
    }
    return ('' + val).substring(5);
  }
});

Coffee_App.filter('groupTime', function() {
  return function(val) {
    if (!val) {
      return '';
    }
    var today = new Date();
    var theDay = new Date(val);

    if (today.getFullYear() == theDay.getFullYear()
        && today.getMonth() == theDay.getMonth()
        && today.getDate() == theDay.getDate()) {
      return '抢购中'
    }
    return '即将开抢'
  }
});
