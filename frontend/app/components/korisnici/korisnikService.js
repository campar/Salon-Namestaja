var app = angular.module('korisnikService', [])

app.factory("LogovanService", function($window){
    let activeUser = $window.localStorage.getItem("korisnik");
    let token = $window.localStorage.getItem("token");

    return {
        getActiveUser:() => {
            return JSON.parse(activeUser);
        },

        getToken:() =>{
            return token;
        },
    
        setActiveUser:(newActiveUser) => {
            $window.localStorage.setItem('korisnik', newActiveUser)
            activeUser = newActiveUser 
        },

        setToken:(newToken) => {
            $window.localStorage.setItem('token', newToken)
            token = newToken;
        },

        removeToken:() => {
            $window.localStorage.removeItem('token')
             token = null
        },

        removeUser:() => {
            $window.localStorage.removeItem('korisnik')
            activeUser = null
        }
    }
});
