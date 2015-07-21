(function () {
    'use strict';

    var app = angular.module('app', [],
        function ($controllerProvider) {
            $controllerProvider.allowGlobals();
        });
})();

function CartController ($scope, $http) {
    $scope.cart = [];
    $scope.freebies = [];
    $scope.sub_total = 0;
    $scope.s_charge = 0;

    var _start = function () {
        $http.get('json/cart.json').success(function (data) {
            data.forEach(function (item) {
                item.subtotal = item.price * item.quantity;
                $scope.sub_total += item.subtotal;
            });

            $scope.cart = data;

            $scope.s_charge = get_service_charge($scope.sub_total);
        });

        $http.get('json/freebies.json').success(function (data) {
            $scope.freebies = data;
        });
    },
    
    get_service_charge = function (amount) {
        var charge = 0,
            amount = +amount;

        if (amount >= 200 && amount <= 500) {
            charge = 70;
        }
        else if (amount >= 501 && amount <= 2000) {
            alert();
            charge = (amount * (10 / 100));
        }
        else if (amount >= 2001 && amount <= 5000) {
            charge = (amount * (8 / 100));
        }
        else if (amount >= 5001) {
            charge = (amount * (7 / 100));
        }

        return charge;
    }

    _start();
}
