(function () {
    'use strict';

    var controllerId = 'ProductController';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$routeParams', '$http', '$rootScope', 'action', ProductController]);

    function ProductController($scope, $routeParams, $http, $rootScope, action) {
        var vm = this;

        vm.activate = activate;
        vm.products = [];
        vm.product = {
            id: 0,
            title: "",
            price: 0,
            acquireDate: "",
            isActive: true,
            categoryId: 0
        };

        $scope.AddProductToCart = function () {
            $rootScope.shoppingCartItems.push(
                {
                    id: vm.product.id,
                    title: vm.product.title,
                    price: vm.product.price,
                    quantity: 1,
                    subTotal: vm.product.price
                });
            toastr.success("Seu carrinho possui <strong>" + $rootScope.shoppingCartItems.length + "</strong> produto(s)", "Produto Adicionado ao Carrinho");
        }

        if (action === 'list') {
            alert("Listando...");
        }

        if (action === 'details') {
            GetProduct($routeParams.id);
        }

        if (action === 'new') {
            alert("Novo");
        }

        if (action === 'delete') {
            alert("Excluindo");
        }

        function activate() { }

        function GetProduct(id) {
            $http.get('http://devstore-api.azurewebsites.net/api/v1/public/products/' + id)
            .success(function (data, status, headers, config) {
                vm.product = data;
            });
        }
    }
})();
