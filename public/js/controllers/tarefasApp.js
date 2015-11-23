(function(angular){
    "use strict";

    angular.module("tarefasApp", ["ngResource"])
           .controller("tarefasController",
        ["$scope", "$window", "$resource",
            ($scope, $window, $resource)=>{
                $scope.tarefas = [];
                $scope.submitted = false;
                let partes = $window.location.pathname.split("/");
                let categoria = partes[partes.length - 1];
                let pedido = $resource("/api/tarefas/:categoria", { categoria: categoria });

                $scope.novaTarefa = { descricao: "" };


                $scope.elimina = function(obj){
                    pedido.delete({descricao: obj.descricao})
                        .$promise.then(tarefaAtualizada => $scope.tarefas = tarefaAtualizada.tarefas)
                        .catch(err => $scope.erro = err);
                };

                $scope.adiciona = function(valido){
                    $scope.submitted = true;
                    if(!valido){
                        return;
                    }
                    let novaTarefa = { descricaoTarefa: $scope.novaTarefa.descricao };
                    pedido.save(null, novaTarefa)
                        .$promise.then(tarefaGravada =>  $scope.tarefas.push(tarefaGravada))
                        .catch(err => $scope.erro = err );
                };


                pedido.query()
                    .$promise.then(tarefas => {
                        $scope.erro = null;
                        $scope.tarefas = tarefas;
                    })
                    .catch(err => {
                        $scope.erro = err;
                    });
            }
        ]);
})(angular);