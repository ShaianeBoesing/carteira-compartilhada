const logar = async () => {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const url = '/login';

    let data = {
        email: email.value,
        password: password.value
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    let requisicao = await fetch(url, fetchData);
    let status = requisicao.status;
    console.log(status);

    if (status === 200) {
        window.location.href = '/';
    }
    else {
        window.alert('Usuário inválido!');
    }
}
