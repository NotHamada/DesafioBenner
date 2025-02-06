function getUsuario(id) {
    $.ajax({
        url: '/api/values/' + id,
        type: 'GET',
        success: function (usuario) {
            console.log('Usuário:', usuario);
            // Faça algo com o usuário retornado
        },
        error: function (xhr, status, error) {
            console.log('Erro ao obter usuário:', error);
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
            console.log('Usuário criado:', usuarioCriado);
            // Faça algo com o usuário criado
        },
        error: function (xhr, status, error) {
            console.log('Erro ao criar usuário:', error);
        }
    });
}

function excluirUsuario(id) {
    $.ajax({
        url: '/api/values/' + id,
        type: 'DELETE',
        success: function () {
            console.log('Usuário excluído com sucesso');
            // Faça algo após a exclusão do usuário
        },
        error: function (xhr, status, error) {
            console.log('Erro ao excluir usuário:', error);
        }
    });
}