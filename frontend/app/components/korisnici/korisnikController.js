var app = angular.module('korisnikController', ['korisnikService'])

app.controller('KorisnikController', ['$scope', '$http', function($scope,$http) {
    $scope.loading = true;
    $http.get("http://localhost:5000/korisnici")
    .then(function(response) {
        $scope.loading = false;
        $scope.korisnici = response.data;
    });
}]);//napravite da se prikazuju ali samo pojedinacni korisnici

app.controller("KreirajKorisnikaController", function ($scope, $http,$location) {
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
            }).then(function (data, status, headers, config){
                $location.path("/login");
            })
        }
    }
});

app.controller("LoginKorisnikaController", function ($scope, $http, $window, $location, LogovanService) {
    $scope.list = {};
    $scope.pogresno = null;
    $scope.submit = function (valid) {
        if(valid){
            $http({
                url:"http://localhost:5000/login",
                method:"post",
                data:$scope.list,
            })
            .then(function (data, status, headers, config) {
                console.log(data)
                if(data.data.token){
                    LogovanService.setActiveUser(JSON.stringify(data.data.korisnik));
                    LogovanService.setToken(data.data.token);
                    $location.path("/");
                }
                else{
                    $scope.pogresno = data.data.success
                }
            })
        }
    };
});

app.controller("LoginController", function ($scope, $window,$location, LogovanService) {
    $scope.logovan = () => {
        return !!LogovanService.getToken()
    }

    $scope.logOut = () => {
        LogovanService.removeToken();
        LogovanService.removeUser();
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