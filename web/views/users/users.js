const email = document.querySelector('#email');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeat-password');

const registrar = () => {
    
    console.log(email.value)
    fetch('../models/User')
        .then(function () {
            // handle the response
        })
        .catch(function () {
            // handle the error
        });
}
