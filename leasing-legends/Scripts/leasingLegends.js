angular
  .module('leasingLegends', [])
  .controller('pricesController',['$http', '$scope', pricesController]);

function pricesController($http, $scope) {

    $scope.test = "hello";

    $http.get('../Data/data.json').then(
        function(prices) {
            $scope.prices = prices.data;
            
        },
        function(err) {
            console.log(err);
        });
    };


