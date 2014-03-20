(function () {
    'use strict';

    var controllerId = 'ProductController';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', ProductController]);

    function ProductController($scope) {
        var vm = this;

        vm.activate = activate;
        vm.title = 'ProductController';

        function activate() { }
    }
})();
