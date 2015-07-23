var INTERVAL_DELAY = 250;
Coffee_App.directive("scroll", ['$window', function($window) {
    return function(scope, element, attrs) {
        var fn = function(e, isEnd) {
            if(!isEnd) {
                return;
            }
            console.log(element);
            console.log(element.find('.list-group-next'));
            var next = element.find('.list-group-next:visible');
            if (next.length < 1) {
                return;
            }
            if (next.offset()['top'] + next[0].offsetHeight - 10 < element.height()) {
                console.log('more');
                next.click();
            }
            scope.$apply();
        };

        var interval,
        handler,
        el = element[0],
        scrollEvent = 'scroll',
        scrollPosition = {
            x: 0,
            y: 0
        };

        var bindScroll = function() {
            handler = function(event) {
                scrollPosition.x = el.scrollLeft;
                scrollPosition.y = el.scrollTop;

                startInterval(event);
                unbindScroll();
                scrollTrigger(event, false);
            };

            element.bind(scrollEvent, handler);
        };

        var startInterval = function(event) {
            interval = $window.setInterval(function() {
                if(scrollPosition.x == el.scrollLeft && scrollPosition.y == el.scrollTop) {
                    $window.clearInterval(interval);
                    bindScroll();
                    scrollTrigger(event, true);
                } else {
                    scrollPosition.x = el.scrollLeft;
                    scrollPosition.y = el.scrollTop;
                }
            }, INTERVAL_DELAY);
        };

        var unbindScroll = function() {
            // be nice to others, don't unbind their scroll handlers
            element.unbind(scrollEvent, handler);
        };

        var scrollTrigger = function(event, isEndEvent) {
            fn(event, isEndEvent);
        };

        bindScroll();
    };
}]);
