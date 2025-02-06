function getUsuario(id) {
    $.ajax({
        url: '/api/values/' + id,
        type: 'GET',
        success: function (usuario) {
            console.log('Usu�rio:', usuario);
            // Fa�a algo com o usu�rio retornado
        },
        error: function (xhr, status, error) {
            console.log('Erro ao obter usu�rio:', error);
        }
    });
}

function criarUsuario(usuario) {
    $.ajax({
        url: '/api/values',
        type: 'POST',
        data: JSON.stringify(usuario),
        contentType: 'application/json',
        success: function (usuarioCriado) {
            console.log('Usu�rio criado:', usuarioCriado);
            // Fa�a algo com o usu�rio criado
        },
        error: function (xhr, status, error) {
            console.log('Erro ao criar usu�rio:', error);
        }
    });
}

function excluirUsuario(id) {
    $.ajax({
        url: '/api/values/' + id,
        type: 'DELETE',
        success: function () {
            console.log('Usu�rio exclu�do com sucesso');
            // Fa�a algo ap�s a exclus�o do usu�rio
        },
        error: function (xhr, status, error) {
            console.log('Erro ao excluir usu�rio:', error);
        }
    });
}