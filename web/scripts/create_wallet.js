const create_wallet = async () => {
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const email_lista = email.split(',')

    const url = '/wallets';
    let url_add_part = '/users_wallets/w/'


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

    let fetchData_add = {
        method: 'POST',
        body: JSON.stringify({ participants_emails: email_lista }),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    let requisicao = await fetch(url, fetchData);
    let status = requisicao.status;
    if (status === 201) {
        let reqJson = await requisicao.json()
        url_add_part = url_add_part + reqJson.wallet._id
        let add_participantes = await fetch(url_add_part, fetchData_add)
        let promisse = await add_participantes.json()
        console.log(promisse.errors)

        const div = document.createElement('dib')
        const corpo = document.getElementById('corpo')
        const mensagem = document.createElement('h2')
        let card_btn = document.createElement('a')
        const sub_mensagem2 = document.createElement('div')
        sub_mensagem2.className = 'form-text'
        
        if (promisse.message !== '0 Participantes Adicionados!') {
            sub_mensagem2.innerHTML = promisse.message
        }

        div.appendChild(mensagem)
        for (erro of promisse.errors) {
            const sub_mensagem = document.createElement('div')
            sub_mensagem.className = 'form-text text-danger'
            if (erro !== `E-mail  inválido`) {
                sub_mensagem.innerHTML = erro
            }
            div.appendChild(sub_mensagem)
        }

        card_btn.className = 'btn mt-4 btn-success btn-block btn-lg gradient-custom-4 text-body'
        card_btn.href = '/wallets/create'
        card_btn.innerHTML = 'Voltar'
        mensagem.innerHTML = 'Carteira criada com sucesso'
        mensagem.className = 'text-uppercase text-center'
        div.appendChild(sub_mensagem2)
        div.appendChild(card_btn)
        corpo.replaceChildren(div)
    }
    else {
        let message = await requisicao.json()
        let errorOutput = document.getElementById('error')
        errorOutput.innerHTML = message.message
    }
}

//