angular.module('app.directives', [])

.directive('ccScroll', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ccScroll, function (value) {
                $(element).animate({ scrollTop: value }, 600);
            }, true);
        }
    }
})

.directive('ccHrefName', function ($route) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var routeName = attrs.ccHrefName.toLowerCase();
            var href = '';
            for (var path in $route.routes) {
                if ($route.routes.hasOwnProperty(path)) {
                    if ($route.routes[path].name && $route.routes[path].name.toLowerCase() === routeName) {
                        console.log(element);
                        $(element).attr('href', '#' + path);
                    }
                }
            }
        }
    }
})

.directive('ccProgress', function (_) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/progress.html',
        link: function (scope, element, attrs) {
            scope.vals = [];
            scope.$watch(attrs.ccProgressData, function (value) {
                var data = value;
                _.each(_.range(5), function (i) {
                    var thisAnswerTypeCount = _.filter(value, function (question) { return question[1] === i }).length;
                    scope.vals[i] = (thisAnswerTypeCount * 2) + "%";
                });
            }, true);
        }
    }
})

.directive('ccQuestionButtons', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: { question: "=ccQuestion", submit: "=ccSubmitAnswerFn" },
        templateUrl: 'templates/questionButtons.html',
        link: function (scope, element, attrs) {

            scope.buttons = [
                { text: 'Dislike very much',    class: 'danger' },
                { text: 'Dislike',              class: 'warning' },
                { text: 'Does not matter',      class: 'info' },
                { text: 'Like',                 class: 'primary' },
                { text: 'Like very much',       class: 'success' }
            ];

            scope.localClick = function (index) {
                !scope.question.disabled && scope.submit(scope.question.id, index);
            };
        }
    }
})

.directive('ccPie', function (d3) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {
            d3.pie(500, 500, element, [1, 2, 3, 4, 5, 6]);
        }
    }
})