var app = angular.module("myApp", 
    ['ngRoute','korisnikController','proizvodService','kategorijeService']
);

app.config(function($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
    // enabled:true,
 });
    $routeProvider
    .when("/", {
        templateUrl : "app/components/pocetna.html",
    })
    .when("/kreiraj/kategoriju", {
        templateUrl : "app/components/kategorije/kreiranje_kategorije.html",
    })
    .when("/proizvodi", {
        templateUrl : "app/components/proizvodi/prikazivanje_svih_proizvoda.html",
    })
    .when("/kreiraj/proizvod", {
        templateUrl : "app/components/proizvodi/kreiranje_proizvoda.html",
    })
    .when("/proizvod/:id", {
        templateUrl : "app/components/proizvodi/prikazivanje_pojedinacnog_proizvod.html",
    })
    .when("/kategorije", {
        templateUrl : "app/components/kategorije/prikazivanje_kategorija.html",
    })
    .when("/registracija", {
        templateUrl : "app/components/korisnici/kreiranje_korisnika.html",
    })
    .when("/korisnici", {
        templateUrl : "app/components/korisnici/prikazivanje_svih_korisnika.html",
    })
    .when("/login", {
        templateUrl : "app/components/login.html",
    })
    .when("/admin", {
        templateUrl : "app/components/admin.html",
    })
    .when("/404", {
        templateUrl : "app/components/404.html",
    })
    .otherwise({
        redirectTo: '404'
    })
});


// app.controller('PocetnaController', ['$scope', function($scope) {
//     $scope.slideID = 1;
    
//     $scope.pomeri = function(n){
//          $scope.slideID = $scope.slideID + n;
//     };

//     $scope.prikazi = function(n){
//         $scope.slika = document.getElementsByClassName('slike');

//         if(n > $scope.slika.length){
//             $scope.slideID = 1;
//         }

//         if(n < 1){
//             $scope.slideID = $scope.slika.length;
//         }
        
//         for(var i = 0; i < $scope.slika.length; i++){
//             $scope.slika[i].style.display = 'none';
//         }
//         $scope.slika[$scope.slideID].style.display = "block";
//     }
// }]);