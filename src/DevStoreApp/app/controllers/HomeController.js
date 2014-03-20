(function () {
    'use strict';

    var controllerId = 'HomeController';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$http', HomeController]);

    function HomeController($scope, $http) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'Catalogo de Produtos';
        vm.products = [];

        function activate() { }
        
        $http.get('http://devstore-api.azurewebsites.net/api/v1/public/products')
            .success(function (data, status, headers, config) {
                angular.forEach(data, function (product) {
                    vm.products.push(product);
                });
            });
    }
})();
