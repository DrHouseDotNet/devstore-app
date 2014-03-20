(function () {
    'use strict';

    var controllerId = 'CategoryController';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', CategoryController]);

    function CategoryController($scope) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'CategoryController';

        function activate() { }
    }
})();
