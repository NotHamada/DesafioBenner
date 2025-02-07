function getUsuario(id) {
    $.ajax({
        url: '/api/values/' + id,
        type: 'GET',
        success: function (usuario) {
            console.log('Usuário:', usuario);
            location.href = "Home/Index"
        },
        error: function (xhr, status, error) {
            console.log('Erro ao obter usuário:', error);
            location.href = "Home/Index"
        }
    });
}

function criarUsuario() {
    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    let usuario = {
        Username: nome,
        Password: senha
    }

    $.ajax({
        url: '/api/values',
        type: 'POST',
        data: JSON.stringify(usuario),
        contentType: 'application/json',
        success: function (usuarioCriado) {
            console.log('Usuário criado:', usuarioCriado);
            location.href = "Home/Index"
        },
        error: function (xhr, status, error) {
            console.log('Erro ao criar usuário:', error);
            location.href = "Home/Index"
        }
    });
}

function excluirUsuario(id) {
    $.ajax({
        url: '/api/values/' + id,
        type: 'DELETE',
        success: function () {
            console.log('Usuário excluído com sucesso');
            location.href = "Home/Index"
        },
        error: function (xhr, status, error) {
            console.log('Erro ao excluir usuário:', error);
            location.href = "Home/Index"
        }
    });
}