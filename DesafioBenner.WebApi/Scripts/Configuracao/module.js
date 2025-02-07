function getConfiguracao(id) {
    $.ajax({
        url: '/api/configuracoes/' + id,
        type: 'GET',
        success: function (configuracao) {
            console.log('Configura��o:', configuracao);
            // Fa�a algo com a configura��o retornada
        },
        error: function (xhr, status, error) {
            console.log('Erro ao obter configura��o:', error);
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
            console.log('Configura��o criada:', configuracaoCriada);
            // Fa�a algo com a configura��o criada
        },
        error: function (xhr, status, error) {
            console.log('Erro ao criar configura��o:', error);
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
            console.log('Configura��o atualizada:', configuracaoAtualizada);
            // Fa�a algo com a configura��o atualizada
        },
        error: function (xhr, status, error) {
            console.log('Erro ao atualizar configura��o:', error);
        }
    });
}

function excluirConfiguracao(id) {
    $.ajax({
        url: '/api/configuracoes/' + id,
        type: 'DELETE',
        success: function () {
            console.log('Configura��o exclu�da com sucesso');
            // Fa�a algo ap�s a exclus�o da configura��o
        },
        error: function (xhr, status, error) {
            console.log('Erro ao excluir configura��o:', error);
        }
    });
}