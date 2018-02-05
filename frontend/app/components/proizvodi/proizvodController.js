var app = angular.module('proizvodService', ['korisnikService']);

app.controller('SviProizvodiController', function($scope,$http,$routeParams, LogovanService) {
    $scope.loading = true;
    $scope.sortByCena = true;

    $scope.proizvodi = {}
    $http.get("http://localhost:5000/proizvodi", {headers:{Authorization:'Bearer '}})
    .then(function(response) {
        $scope.proizvodi = response.data;
        console.log($scope.proizvodi)
        $scope.loading = false;
    });

    $scope.obrisi = (id) => {
        $http.delete(`http://localhost:5000/proizvodi/${id}`)
        .then(function(response) {
           $scope.proizvodi.splice($scope.proizvodi.findIndex((pID) => {
            return pID.id == id;
           }), 1)
    })

  }

    $scope.reverse = (boolean) => {
        return $scope.sortByCena = boolean;
    }
    $scope.admin = () =>{
        $scope.is_admin = false
        if(LogovanService.getActiveUser()){
            if(LogovanService.getActiveUser().is_admin === 1){//treba gledati i bazu, jer se moze LS moze izmeniti i dobiti privilegije
               $scope.is_admin = true
            }
            else{
                $scope.is_admin = false
            }
        }
        return $scope.is_admin
    }
});


app.controller('PojedinacniProizvodiController', function($scope,$http, $routeParams) {
    $scope.loading = true;
    console.log($routeParams);
    $http.get(`http://localhost:5000/proizvodi/${$routeParams.id}`)
        .then(function(response) {
            $scope.proizvod = response.data;
            console.log($scope.proizvod)
            $scope.loading = false;

    })
});


app.controller("KreirajProizvodController", function ($scope, $http,$location) {
    $scope.list = {};

    $http.get("http://localhost:5000/kategorije")
    .then(function(response) {
        $scope.loading = false;
        $scope.kategorije = response.data;

    });

    $scope.submit = function () {

        var fd = new FormData();
        fd.append('cena', $scope.list.cena);
        fd.append('naziv', $scope.list.naziv);
        fd.append('kolicina', $scope.list.kolicina);
        fd.append('opis', $scope.list.opis);
        fd.append('file', $scope.list.file);
        fd.append('kategorija_id', $scope.list.kategorija_id);

         $http({
            url:"http://localhost:5000/proizvodi",
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


app.controller("KategorijaProizvodController", function ($scope, $http, $routeParams) {
    $scope.loading = true;
    console.log($routeParams);
    $http.get(`http://localhost:5000/kategorije/${$routeParams.id}/proizvodi`)
        .then(function(response) {
            $scope.proizvodi = response.data;
            console.log($scope.proizvod)
            $scope.loading = false;
    })
});
