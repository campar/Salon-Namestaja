var app = angular.module('kategorijeService', [])

app.controller('KategorijeController', ['$scope', '$http', function($scope,$http) {
	$scope.loading = true;
    $http.get("http://localhost:5000/kategorije")
    .then(function(response) {
    	$scope.loading = false;
        $scope.kategorije = response.data;
    });
}]);

app.controller("KreirajKategorijuController", function ($scope, $http) {
    
    $scope.list = {};

    $scope.submit = function () {
        console.log($scope.list);
        

         $http({
		    url:"http://localhost:5000/kategorije",
		    method:"POST",
		    data:"$scope.list",
		    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    	})
        .then(function (data, status, headers, config) {
            // $scope.vesti = data;
        })
    };
});

