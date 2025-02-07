function getConfiguracao(id) {
    $.ajax({
        url: '/api/configuracoes/' + id,
        type: 'GET',
        success: function (configuracao) {
            console.log('Configuração:', configuracao);
            // Faça algo com a configuração retornada
        },
        error: function (xhr, status, error) {
            console.log('Erro ao obter configuração:', error);
        }
    });
}

function criarConfiguracao() {
    var time = document.getElementById("time").value;
    var power = document.getElementById("power").value;
    var name = document.getElementById("name").value;
    var symbol = document.getElementById("symbol").value;

    let configuracao = {
        Time: time,
        Power: power,
        Name: name,
        Symbol: symbol
    }

    $.ajax({
        url: '/api/configuracoes',
        type: 'POST',
        data: JSON.stringify(configuracao),
        contentType: 'application/json',
        success: function (configuracaoCriada) {
            console.log('Configuração criada:', configuracaoCriada);
            // Faça algo com a configuração criada
        },
        error: function (xhr, status, error) {
            console.log('Erro ao criar configuração:', error);
        }
    });
}

function atualizarConfiguracao(id, configuracao) {
    $.ajax({
        url: '/api/configuracoes/' + id,
        type: 'PUT',
        data: JSON.stringify(configuracao),
        contentType: 'application/json',
        success: function (configuracaoAtualizada) {
            console.log('Configuração atualizada:', configuracaoAtualizada);
            // Faça algo com a configuração atualizada
        },
        error: function (xhr, status, error) {
            console.log('Erro ao atualizar configuração:', error);
        }
    });
}

function excluirConfiguracao(id) {
    $.ajax({
        url: '/api/configuracoes/' + id,
        type: 'DELETE',
        success: function () {
            console.log('Configuração excluída com sucesso');
            // Faça algo após a exclusão da configuração
        },
        error: function (xhr, status, error) {
            console.log('Erro ao excluir configuração:', error);
        }
    });
}