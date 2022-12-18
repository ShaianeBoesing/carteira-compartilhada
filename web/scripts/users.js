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
    let response = await requisicao.json();

    if (status === 200) {
        window.location.href = '/';
    }
    else {
        window.alert(response.message);
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
    const repeatPassWord = document.querySelector('#repeat-password');

    if (!validateUserName(username.value))
        return
    if (!validateEmail(email))
        return
    if (!validarSenha(password.value, repeatPassWord.value))
        return

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
    let response = await requisicao.json();

    let status = requisicao.status;

    if (status === 201) {
        window.location.href = '/';
    }
    else {
        window.alert(response.message);
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

const validateUserName = (name) => {
    if (name.length > 3) {
        document.getElementById("msname").innerHTML = "Nome válido";
        return true;
    }
    document.getElementById("msname").innerHTML = "Nome inválido";
    return false;
}

const validateEmail = (field) => {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("msgemail").innerHTML = "E-mail válido";
        return true;
    }
    else {
        document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";
        return false;
    }
}

const validarSenha = (password, repeat) => {
    if (password != repeat) {
        document.getElementById("msgsenha").innerHTML = "As senhas são diferentes";
        return false
    }
    return true;
}
