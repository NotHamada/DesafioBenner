function fazerLogin() {
    $.ajax({
        url: '/api/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            Username: 'admin',
            Password: '123456'
        }),
        success: function (response) {
            localStorage.setItem('jwt', response.token);
            console.log('Login successful:', response.token);
        },
        error: function (error) {
            console.error('Erro no login:', error);
        }
    });
}