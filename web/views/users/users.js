const email = document.querySelector('#email');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeat-password');

const url = '../controllers/users_controller/';

let data = {
    'name': username.value,
    'email': email.value
}

let fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
    })
}

fetch(url, fetchData)
    .then(function () {
        // Handle response you get from the API
    });

const registrar = () => {

}
