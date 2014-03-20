(function () {
    'use strict';
    var id = 'app';

    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute'
    ]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController as vm',
                templateUrl: 'app/views/home/index.html'
            })
            .when('/produtos', {
                controller: 'ProductController as vm',
                templateUrl: 'app/views/product/index.html'
            })
            .when('/categorias', {
                controller: 'CategoryController as vm',
                templateUrl: 'app/views/category/index.html'
            });
    });

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

})();