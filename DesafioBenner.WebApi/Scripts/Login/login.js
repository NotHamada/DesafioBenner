function fazerLogin() {
    $.ajax({
        url: '/api/login',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({
            username: "admin",
            password: "123456"
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