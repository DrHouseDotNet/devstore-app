(function () {
    'use strict';

    var controllerId = 'CategoryController';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$http', CategoryController]);

    function CategoryController($scope, $http) {
        var vm = this;

        vm.activate = activate;
        vm.categories = [];
        vm.category = {
            id: 0,
            title: ""
        };

        function activate() { }
        GetCategories();

        $scope.SaveCategory = function () {
            var data = vm.category;

            if (data.id == 0) {
                $http.post('http://devstore-api.azurewebsites.net/api/v1/public/categories', data)
                .success(function (result) {
                    toastr.success("Categoria cadastrada com sucesso", "Nova Categoria");
                    vm.categories.push(result);
                    ResetCategory();
                });
            } else {
                $http.put('http://devstore-api.azurewebsites.net/api/v1/public/categories', data)
                .success(function () {
                    toastr.success("Categoria alterada com sucesso", "Alteração");
                    ResetCategory();
                });
            }
        };

        $scope.SelectCategory = function (id) {
            angular.forEach(vm.categories, function (cat) {
                if (cat.id == id) {
                    vm.category = cat;
                }
            });
        };

        $scope.DeleteCategory = function () {
            var cid = vm.category.id;

            if (cid == 0) {
                toastr.error("Selecione uma categoria", "Erro");
                return false;
            }
            
            $http.delete('http://devstore-api.azurewebsites.net/api/v1/public/categories?categoryId=' + cid)
                .success(function () {
                    angular.forEach(vm.categories, function (cat) {
                        if (cat.id == cid) {
                            var index = vm.categories.indexOf(cat);
                            vm.categories.splice(index, 1);
                            toastr.success("Categoria excluída com sucesso!", "Sucesso");
                            ResetCategory();
                        }
                    });
                });
        };

        $scope.NewCategory = function () {
            ResetCategory();
        }

        function GetCategories() {
            $http.get('http://devstore-api.azurewebsites.net/api/v1/public/categories')
            .success(function (data, status, headers, config) {
                angular.forEach(data, function (cat) {
                    vm.categories.push(cat);
                });
            });
        }

        function ResetCategory() {
            vm.category = {
                id: 0,
                title: ""
            };
        }
    }
})();
