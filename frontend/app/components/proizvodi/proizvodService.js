var app = angular.module('proizvodService', []);

app.controller('SviProizvodiController', ['$scope', '$http', function($scope,$http) {
    $scope.loading = true;
    $http.get("http://localhost:5000/proizvodi")
    .then(function(response) {
        $scope.proizvodi = response.data;
        $scope.loading = false;
    });
}]);

app.controller("KreirajProizvodController", function ($scope, $http) {
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

app.controller('PojedinacanProizvodController', ['$scope', '$http', function($scope,$http) {
    $http.get("http://localhost:8000/vest/:id")
    .then(function(response) {
        $scope.korisnici = response.data;

    });
}]);

app.controller('ProizvodController', ['$scope', '$http', function($scope,$http) {
    $http({
        url:"http://localhost:8000/vest",
        method:"get",
        dataType: 'jsonp'
    })
    .then(function(response) {
        $scope.loading = true;
        $scope.vesti = response.data;
        $scope.loading = false;
    });
}]);


app.controller("KreirajKategorijuController", function ($scope, $http) {
    
});
