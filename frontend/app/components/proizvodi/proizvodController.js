var app = angular.module('proizvod', []);

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
         // $scope.list.push(this.naslov);
         // $scope.list.push(this.sadrzaj);
         // $scope.list.push(this.kategorija);

         $http({
    url:"http://localhost:8000/kreiraj/vest",
    method:"post",
    data:"$scope.list",
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    })
        .then(function (data, status, headers, config) {
            $scope.vesti = data;
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