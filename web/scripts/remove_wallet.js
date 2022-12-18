const populate = async () => {
    const url = '/users_wallets/wallets';

    const form = document.getElementById('form')

    const meFetch = await fetch(`/users/get`)
    const meJson = await meFetch.json()
    const me = meJson.data


    const fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }


    const requisicao = await fetch(url, fetchData);
    const status = requisicao.status;

    if (status === 201) {
        const jason = await requisicao.json()
        const carteiras = jason.data
        for (let carteira of carteiras) {
            if (carteira.wallet !== null) {
                let option = document.createElement('option')
                option.className = ''
                option.value = carteira.wallet._id
                option.innerHTML = carteira.wallet.name
                form.appendChild(option)
            }
        }
        if (form.length === 0) {
            const corpo = document.getElementById('corpo')
            const mensagem = document.createElement('h2')
            let card_btn = document.createElement('a')
            card_btn.className = 'btn btn-success btn-block btn-lg gradient-custom-4 text-body'
            card_btn.href = '/'
            card_btn.innerHTML = 'Voltar'
            mensagem.innerHTML = 'Não há carteiras a serem removidas.'
            mensagem.className = 'text-uppercase text-center'
            corpo.replaceChildren(mensagem, card_btn)
        }

    } else {
        let message = await requisicao.json()
        window.alert(message)
    }
}
populate()

const delete_wallet = async () => {
    const id_carteira_selecionada = document.getElementById('form')

    const url_delete = '/wallets/' + id_carteira_selecionada.value

    const fetchData = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    const promisse = await fetch(url_delete, fetchData)
    if (promisse.status == 204) {
        const corpo = document.getElementById('corpo')
        const mensagem = document.createElement('h2')
        let card_btn = document.createElement('a')
        card_btn.className = 'btn btn-success btn-block btn-lg gradient-custom-4 text-body'
        card_btn.href = '/wallets/remove'
        card_btn.innerHTML = 'Voltar'
        mensagem.innerHTML = 'Carteira removida com sucesso'
        mensagem.className = 'text-uppercase text-center'
        corpo.replaceChildren(mensagem, card_btn)
    }
}