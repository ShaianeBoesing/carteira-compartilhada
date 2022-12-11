const registrar = () => {
    let email = document.querySelector('#email');
    console.log(email.value)
    fetch('../models/User')
        .then(function () {
            // handle the response
        })
        .catch(function () {
            // handle the error
        });
}
