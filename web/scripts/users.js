const logar = () => {
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

    fetch(url, fetchData)
    .then(window.location.href = "/", )
}
