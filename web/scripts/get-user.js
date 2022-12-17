document.addEventListener("DOMContentLoaded", async () => {
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const url_store = '/users/get';

    let fetchData = {
        method: 'GET',
        body: JSON.stringify(),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    let requisicao = await fetch(url_store, fetchData);
    let status = requisicao.status;
    console.log(status);
    if (status === 201) {
        console.log(requisicao.json().then(res => res.result));
        username.value = requisicao.json().then(res.result);
    }
    else {
        window.alert(requisicao.message);
    }
})