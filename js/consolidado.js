var nutricionista = angular.module('nutricionistaApp', []);
nutricionista.controller('consolidadoCtrl', ['$scope', '$http', function($scope, $http){

	console.log(localStorage.cadastroList);
	
    var cadastroList = localStorage.cadastroList;
    var consolidadoPorResposta = localStorage.consolidadoPorResposta;

    if(cadastroList == undefined || consolidadoPorResposta == undefined){

    	return false;
    }


    cadastroList = JSON.parse(cadastroList);

    if(cadastroList.length > 0){

	    $scope.inputList = cadastroList;
    }

    consolidadoPorResposta = JSON.parse(consolidadoPorResposta);

    var result = [];

    angular.forEach(consolidadoPorResposta, function(value, key) {
      
      result.push({questao: key, acertos: value.acertos, erros:value.erros});

    });

    $scope.consolidadoPorResposta = result;


}]);