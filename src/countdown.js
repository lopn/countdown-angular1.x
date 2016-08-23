/**
 * Created by gabvk_000 on 2016/8/23.
 */
angular.module('countDown', [])
    .directive("countdown", ["$timeout", function ($timeout) {
        return {
            restrict: "EA",
            scope: {
                status: "=",
                time:'='
            },
            link: function (scope, element, attrs) {
                var reduce, interval;
                var domInit = element.html();
                var timeRuningText = attrs.tpl ? attrs.tpl.split("?time") : ["倒计时", "秒"];
                function timeEnd() {
                    element.removeClass("disabled");
                    element.removeAttr("disabled");
                    element.html(domInit);
                    $timeout.cancel(interval);
                    reduce = -1;
                    scope.status = "end"
                }

                function timeStart() {
                    return reduce > 0 ? function () {
                        scope.status = "running"
                    }
                        : (scope.status = "running",
                        reduce = scope.time,
                        element.addClass("disabled"),
                        element.attr("disabled","disabled"),
                        timeRun())
                }

                function timeRun() {
                    var reduceTime = --reduce;
                    return "stop" === scope.status ? timeEnd() : (element.text(timeRuningText[0] + parseInt(reduceTime/60)+"分"+reduceTime%60+"秒" + timeRuningText[1]),
                        reduce > 0 ? void (i = $timeout(timeRun, 1000)) : timeEnd())
                }
                element.on("click", timeStart);
                scope.$watch("status", function (value) {
                    "start" === value && timeStart();
                    "stop" === value && timeEnd();
                }),
                    scope.$on("$destroy", function () {
                        interval && $timeout.cancel(interval)
                    })
            }
        }
    }
]);
