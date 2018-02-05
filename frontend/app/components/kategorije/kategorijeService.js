var app = angular.module('kategorijeService', [])

app.controller('KategorijeController', ['$scope', '$http', function($scope,$http) {
	$scope.loading = true;
    $http.get("http://localhost:5000/kategorije")
    .then(function(response) {
    	$scope.loading = false;
        $scope.kategorije = response.data;
    });
}]);

app.controller("KreirajKategorijuController", function ($scope, $http, $location) {
    
    $scope.list = {};

    $scope.submit = function () {
        console.log($scope.list);
        var fd = new FormData();
        fd.append('naziv', $scope.list.naziv);
        fd.append('opis', $scope.list.opis);
        fd.append('slika', $scope.list.slika);

         $http({
            url:"http://localhost:5000/kategorije",
            method:"post",
            data:fd,
            headers:{
                'Content-Type': undefined
            }
        })
        .then(function (data, status, headers, config) {
            console.log($scope.list)
            $location.path("/");
        })
    };
});

