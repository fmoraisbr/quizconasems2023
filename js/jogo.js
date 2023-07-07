var nutricionista = angular.module('nutricionistaApp', []);
nutricionista.controller('jogoCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    $scope.perguntasSelecionadas = [];
    $scope.perguntaTela = {};
    $scope.respostaTemporaria = {};
    $scope.respostasCorretas = 0;
    $scope.enableButton = false;
    $scope.currentView = 1;
    $scope.countTimeOut = 100;

    var perguntasLength = perguntas.length;
    var current = 0;

    //captura randomicamente as perguntas evitando repeticoes
    while ($scope.perguntasSelecionadas.length < 5) {

        getRandom($scope, perguntasLength);
    }

    console.log($scope.perguntasSelecionadas);

    montaPergunta($scope, current);

    stop = $interval(function () {


        console.log($scope.countTimeOut);

        if ($scope.countTimeOut <= 0) {


            swal({
                title: "Que pena!!",
                text: "Seu tempo infelizmente terminou. Tente mais tarde!",
                imageUrl: "img/neutral_face_emoji.png",
                showConfirmButton: false
            });

            setTimeout(function () { window.location.href = "index.html"; }, 7000);

            return false;
        } else {
            $scope.countTimeOut--;
        }

    }, 1000);


    $scope.selecionaItem = function (item, index, perguntaTela) {

        $scope.respostaTemporaria.pergunta = perguntaTela;
        $scope.respostaTemporaria.resposta = index;

        $scope.enableButton = true;

    }

    $scope.processaResposta = function () {

        var questoesConsolidado = {};

        if (localStorage.questoesConsolidado != undefined) {

            questoesConsolidado = localStorage.questoesConsolidado;
            questoesConsolidado = JSON.parse(questoesConsolidado);
        }

        //prcessa a resposta

        var consolidadoPorResposta = {};

        if (localStorage.consolidadoPorResposta != undefined) {

            consolidadoPorResposta = localStorage.consolidadoPorResposta;
            consolidadoPorResposta = JSON.parse(consolidadoPorResposta);
        }

        var index = {};

        var questao = $scope.respostaTemporaria.pergunta.questao;

        if (consolidadoPorResposta[questao] == undefined) {

            consolidadoPorResposta[questao] = { acertos: 0, erros: 0 };

        }

        if ($scope.respostaTemporaria.pergunta.correto == $scope.respostaTemporaria.resposta) {

            $scope.respostasCorretas++;

            consolidadoPorResposta[questao].acertos = consolidadoPorResposta[questao].acertos + 1;

        } else {

            consolidadoPorResposta[questao].erros = consolidadoPorResposta[questao].erros + 1;

        }

        console.log(consolidadoPorResposta);

        localStorage.consolidadoPorResposta = JSON.stringify(consolidadoPorResposta);

        if (current == 4 /*5 perguntas respondidas*/) {

            console.log($scope.respostasCorretas);
            //processo resposta, salvo em localStorage e mando pra página do resultado
            $scope.checarDesempenho();

        } else {

            current++;

            //passa para a proxima pergunta
            montaPergunta($scope, current);

            $scope.currentView = $scope.currentView + 1;
        }

        $scope.enableButton = false;

    }

    $scope.checarDesempenho = function () {

        localStorage.acertos = $scope.respostasCorretas;

        var cadastroList = []

        if (localStorage.cadastroList != undefined) {

            cadastroList = localStorage.cadastroList;
            cadastroList = JSON.parse(cadastroList);
        }

        console.log(localStorage.cadastroList);

        var cadastro = localStorage.cadastro;

        cadastro = JSON.parse(cadastro);

        cadastro.respostasCorretas = $scope.respostasCorretas;

        cadastroList.push(cadastro);

        localStorage.cadastroList = JSON.stringify(cadastroList);

        //return false;
        setTimeout(function () { }, 500);

        if ($scope.respostasCorretas >= 3 /*3 perguntas acertadas*/) {

            //redirect success
            window.location = "sucesso.html"

        } else {

            //redirect tente na proxima
            window.location = "tente_proxima.html"
        }
    }


}]);

function montaPergunta($scope, current) {


    var perguntaVez = $scope.perguntasSelecionadas[current];
    var perguntaTela = perguntas[perguntaVez];

    console.log(current);
    /*console.log(perguntaVez);*/
    console.log(perguntaTela);

    $scope.perguntaTela.enunciado = perguntaTela.enunciado;
    $scope.perguntaTela.itens = perguntaTela.itens;
    $scope.perguntaTela.correto = perguntaTela.correto;
    $scope.perguntaTela.questao = perguntaTela.questao;

}

function getRandom($scope, perguntasLength) {

    var perguntasSelecionadas = $scope.perguntasSelecionadas;

    if (perguntasSelecionadas.length < 5 /*5 perguntas definidas no requisito*/) {

        random = Math.floor(Math.random() * perguntasLength);

        var insert = true;

        angular.forEach(perguntasSelecionadas, function (value, key) {

            if (value == random) {
                insert = false;
            }
        });

        if (insert) {
            $scope.perguntasSelecionadas.push(random);
        }

    }
}

$(document).ready(function () {

    $("body").on("click", ".element-animation1", function () {

        console.log(this);

        $('.element-animation1').css('background-color', 'rgb(38, 90, 136)');

        $(this).css('background-color', '#78d739')

    });

});
