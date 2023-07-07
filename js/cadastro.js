var nutricionista = angular.module('nutricionistaApp', []);
nutricionista.controller('cadastroCtrl', ['$scope', '$http', function($scope, $http){

    $scope.input = {};
    $scope.estados = estados;
    $scope.input.estado = ''
    localStorage.cadastro = "";

    $scope.saveCadastro = function() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var hours = today.getHours();
        var minutes = today.getMinutes();

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var today = dd+'/'+mm+'/'+yyyy+" "+hours+":"+minutes;

        if (!$scope.input.nome){
            swal("Atenção", "Você precisa inserir seu nome completo", "warning");
            return false;
        }

        if (!$scope.input.email){
            swal("Atenção", "Você precisa inserir seu e-mail", "warning");
            return false;
        }

        if (!$scope.input.cpf){
            swal("Atenção", "Você precisa inserir seu CPF", "warning");
            return false;
        }

        if (!$scope.input.estado){
            swal("Atenção", "Você precisa inserir seu Estado", "warning");
            return false;
        }

        if (!$scope.input.ocupacao){
            swal("Atenção", "Você precisa inserir uma Ocupação", "warning");
            return false;
        }

        var inputs = $scope.input;

        inputs.dataHora = today;

        localStorage.cadastro = JSON.stringify(inputs);

        window.location.href = "jogo.html";
        return false;

    }

}]);

$(document).ready(function(){

    $("#cpf").mask("999.999.999-99");

    $("body").on("click", ".element-animation1", function() {

    });

});
