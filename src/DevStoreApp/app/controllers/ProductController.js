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
        vm.categories = [];
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
            GetProducts();
            GetCategories();
        }

        if (action === 'details') {
            GetProduct($routeParams.id);
        }

        function activate() { }

        function GetProduct(id) {
            $http.get('http://devstore-api.azurewebsites.net/api/v1/public/products/' + id)
            .success(function (data, status, headers, config) {
                console.log(data);
                vm.product = data;
            });
        }

        function GetProducts() {
            $http.get('http://devstore-api.azurewebsites.net/api/v1/public/products')
            .success(function (data, status, headers, config) {
                angular.forEach(data, function (prd) {
                    vm.products.push(prd);
                });
            });
        }

        function GetCategories() {
            $http.get('http://devstore-api.azurewebsites.net/api/v1/public/categories')
            .success(function (data, status, headers, config) {
                angular.forEach(data, function (cat) {
                    vm.categories.push(cat);
                });
            });
        }

        function ResetProduct() {
            vm.product = {
                id: 0,
                title: "",
                price: 0,
                acquireDate: "",
                isActive: true,
                categoryId: 0
            };
        }

        $scope.SelectProduct = function (id) {
            angular.forEach(vm.products, function (prd) {
                if (prd.id == id) {
                    vm.product = prd;
                    console.log(prd);
                }
            });
        };

        $scope.SaveProduct = function () {
            var data = vm.product;

            var currentTime = new Date();
            var month = currentTime.getMonth() + 1;
            var day = currentTime.getDate();
            var year = currentTime.getFullYear();

            data.acquireDate = year + "-" + month + "-" + day;
            //dara.categoryId = data.category.id;

            if (data.id == 0) {
                $http.post('http://devstore-api.azurewebsites.net/api/v1/public/products', data)
                .success(function (result) {
                    toastr.success("Produto cadastrado com sucesso", "Novo Produto");
                    vm.products.push(result);
                    ResetProduct();
                });
            } else {
                $http.put('http://devstore-api.azurewebsites.net/api/v1/public/products', data)
                .success(function () {
                    toastr.success("Produto alterado com sucesso", "Alteração");
                    ResetProduct();
                });
            }
        };

        $scope.DeleteProduct = function () {
            var cid = vm.product.id;

            if (cid == 0) {
                toastr.error("Selecione um Produto", "Erro");
                return false;
            }

            $http.delete('http://devstore-api.azurewebsites.net/api/v1/public/products?productId=' + cid)
                .success(function () {
                    angular.forEach(vm.products, function (prd) {
                        if (prd.id == cid) {
                            var index = vm.products.indexOf(prd);
                            vm.products.splice(index, 1);
                            toastr.success("Produto excluído com sucesso!", "Sucesso");
                            ResetProduct();
                        }
                    });
                });
        };

        $scope.NewProduct = function () {
            ResetProduct();
        }
    }
})();
