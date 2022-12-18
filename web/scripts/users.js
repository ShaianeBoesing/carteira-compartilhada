const logar = async () => {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const url_login = '/login';

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

    let requisicao = await fetch(url_login, fetchData);
    let status = requisicao.status;
    console.log(status);

    if (status === 200) {
        window.location.href = '/';
    }
    else {
        window.alert(requisicao.message);
    }
}

const logout = async () => {

    const url_logout = '/logout';

    let fetchData = {
        method: 'POST',
        body: JSON.stringify({}),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    let requisicao = await fetch(url_logout, fetchData);
    let status = requisicao.status;
    console.log(status);

    if (status === 205) {
        window.location.href = '/';
    }
    else {
        window.alert('Erro inesperado!');
    }
}

const registrar = async () => {
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const url_store = '/users';

    let data = {
        email: email.value,
        password: password.value,
        name: username.value
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    let requisicao = await fetch(url_store, fetchData);
    let status = requisicao.status;
    console.log(status);

    if (status === 200) {
        window.location.href = '/';
    }
    else {
        window.alert(requisicao.message);
    }
}

const hidePassWord = () => {
    var password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}
