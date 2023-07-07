var nutricionista = angular.module('nutricionistaApp', []);
nutricionista.controller('sucessoCtrl', ['$scope', '$http', function($scope, $http){

    var acertos = localStorage.acertos;
    $scope.acertos = acertos;

}]);

$(document).ready(function(){

    $("body").on("click", ".element", function() {


    });

});
