angular.module('starter.controllers', [])

.controller("LoginController", function ($scope, $localStorage, $state, $cordovaOauth, $location) {
    $scope.loginFacebook = function () {
        $cordovaOauth.facebook("1273872342673880", ["email"]).then(function (result) {
            console.log('my access token: ', result.access_token);
            $localStorage.accessToken = result.access_token;
            $state.go("app.profile");
        }, function (error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

})

.controller("ProfileController", function ($scope, $http, $localStorage, $location) {
    console.log('my access token $$$$$$$$$:', $localStorage.accessToken);
    $scope.init = function () {
        $http.get("https://graph.facebook.com/v2.8/me?access_token=" + $localStorage.accessToken).then(function (result) {
                $scope.profileData = result.data;
            },
            function (error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
            });
    };
    $scope.logout = function () {
        delete $localStorage.accessToken;
        $location.path("/login");
    };
    $scope.init();
});