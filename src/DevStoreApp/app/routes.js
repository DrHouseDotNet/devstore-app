(function () {
    'use strict';
    var id = 'app';

    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute'
    ]);

    app.run(function ($rootScope) {
        $rootScope.shoppingCartItems = [];
        $rootScope.shoppingCartItem = {
            id: 0,
            title: "",
            price: 0,
            quantity: "",
            subTotal: 0
        };
    });

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController as vm',
                templateUrl: 'app/views/home/index.html',
                resolve: {
                    action: function () { return 'list'; }
                }
            })
            .when('/produtos', {
                controller: 'ProductController as vm',
                templateUrl: 'app/views/product/index.html',
                resolve: {
                    action: function () { return 'list'; }
                }
            })
            .when('/produtos/:id', {
                controller: 'ProductController as vm',
                templateUrl: 'app/views/product/details.html',
                resolve: {
                    action: function () { return 'details'; }
                }
            })
            .when('/categorias', {
                controller: 'CategoryController as vm',
                templateUrl: 'app/views/category/index.html',
                resolve: {
                    action: function () { return 'list'; }
                }
            })
            .when('/carrinho', {
                controller: 'ShoppingCartController as vm',
                templateUrl: 'app/views/cart/index.html'
            });
    });

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

})();