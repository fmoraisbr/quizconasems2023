var nutricionista = angular.module('nutricionistaApp', []);
nutricionista.controller('tenteProximaCtrl', ['$scope', '$http', '$interval' , function($scope, $http, $interval){

    var acertos = localStorage.acertos;
    $scope.acertos = acertos;
    $scope.countRedirect = 10;

    $scope.plural = "questão";
    if(acertos > 1){

        $scope.plural = "questões";    
    }

    stop = $interval(function() {

        $scope.countRedirect--;
        console.log($scope.countRedirect);

        if ($scope.countRedirect <= 0){
            
            window.location.href = "index.html";
            return false;
        }

        }, 1500);
}]);

$(document).ready(function(){

    $("body").on("click", ".element", function() {


    });

});
