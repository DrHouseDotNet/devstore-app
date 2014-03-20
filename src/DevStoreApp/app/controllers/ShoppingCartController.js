(function () {
    'use strict';

    var controllerId = 'ShoppingCartController';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$rootScope', ShoppingCartController]);

    function ShoppingCartController($scope, $rootScope, action) {
        var vm = this;

        vm.activate = activate;
        vm.items = [];
        vm.item = {
            title: "",
            price: 0,
            quantity: ""
        };

        vm.items = $rootScope.shoppingCartItems;

        vm.total = function () {
            var total = 0;
            angular.forEach(vm.items, function (itm) {
                total += itm.quantity * itm.price;
            });
                
            return total;
        }

        function activate() { }
    }
})();
