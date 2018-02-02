var app = angular.module('korisnikService', [])

app.controller('KorisnikController', ['$scope', '$http', function($scope,$http) {
	$scope.loading = true;
    $http.get("http://localhost:5000/korisnici")
    .then(function(response) {
    	$scope.loading = false;
        $scope.korisnici = response.data;
    });
}]);

app.controller("KreirajKorisnikaController", function ($scope, $http) {
    $scope.list = {};

    $http.get("http://localhost:5000/korisnici")
    .then(function(response) {
        $scope.korisnici = response.data;
        $scope.postoji = false;

        $scope.proveri = function(){
            $scope.postoji = $scope.korisnici.data.some((korisnik) => { 
                return korisnik.korisnicko_ime === $scope.list.korisnicko_ime; 
            });
        }
    });
    
    $scope.submit = function(valid) {

        if(valid){

         $http({
            url:"http://localhost:5000/korisnici",
            method:"post",
            data:$scope.list,
            });
          }
    }
});


app.controller("LoginKorisnikaController", function ($scope, $http, $window) {
     $scope.list = {};

    $scope.submit = function () {
         $http({
            url:"http://localhost:5000/login",
            method:"post",
            data:$scope.list,
        })
        .then(function (data, status, headers, config) {
            console.log(data);
            if(data.data.token){
                $window.localStorage.setItem("korisnik",JSON.stringify(data.data.korisnik));
                $window.localStorage.setItem("token",data.data.token);
                console.log(data.data.korisnik.ime)
            }
            else{
                console.log(data.data.success)
            }
        })
    };
});



app.controller("LoginController", function ($scope, $window) {
    $scope.list = {}

    $scope.token = localStorage.getItem("token");

    $scope.list.getKorisnik = localStorage.getItem("korisnik");
    $scope.list.getToken = localStorage.getItem("token");
    console.log($scope.list)
    $scope.logovan = false

    if($scope.token){
        $scope.logovan = true
    }
    else{
        $scope.logovan = false
    }
    $scope.logOut = function(){
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('korisnik')
        console.log($scope.list)

    }
});