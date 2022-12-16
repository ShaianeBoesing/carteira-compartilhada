const populate = async ()=>{
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;

    const url = '/wallets';

    let data = {
        nome: nome,
        email: email
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
    if (status === 201) {
        window.location.href = '/';
    }
    else {
        let message = await requisicao.json()
        let errorOutput = document.getElementById('error')
        errorOutput.innerHTML = message.message
    }
}