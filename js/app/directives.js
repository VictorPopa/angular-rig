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
<<<<<<< HEAD
                        console.log(element);
                        $(element).attr('href', path);
=======
                        $(element).attr('href', '#' + path);
>>>>>>> b74a884eee99ce11631695754506dbafce90318e
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
            scope.$watch(attrs.ccData, function (data) {
                _.each(_.range(5), function (i) {
                    var thisAnswerTypeCount = _.filter(data, function (question) { return question[1] === i }).length;
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
                { text: 'Dislike very much', class: 'danger' },
                { text: 'Dislike', class: 'warning' },
                { text: 'Does not matter', class: 'info' },
                { text: 'Like', class: 'primary' },
                { text: 'Like very much', class: 'success' }
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
            var pieRef = d3.pie();
            pieRef.init(150, 150, element, [0, 0, 0, 0, 0, 0]);
            scope.$watch(attrs.ccData, function (data) {
                var vals = [];
                _.each(_.range(6), function (i) {
                    var thisCount = _.filter(data, function (question) { return question[1] === i - 1 }).length
                    vals.push(thisCount);
                });
                pieRef.update(vals);
            }, true);

        }
    }
})