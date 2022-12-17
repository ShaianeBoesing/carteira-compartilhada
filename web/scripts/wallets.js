const populate = async () => {
    const url = '/users_wallets/wallets';

    const tela = document.getElementById('tela')

    const meFetch = await fetch(`/users/me`)
    const meJson = await meFetch.json()
    const me = meJson.data


    let fetchData = {
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
                carteira = carteira.wallet
                let integrantes_string = ''
                const integrantesFetch = await fetch(`/users_wallets/users/w/${carteira._id}`)
                const integrantesJson = await integrantesFetch.json()
                const integrantes = integrantesJson.data

                for (let integrante of integrantes) {
                    if (integrante.user.name !== me.name) {
                        integrantes_string += (integrante.user.name)
                    } else {
                        const str = integrante.user.name + '(Me)'
                        integrantes_string += (str)
                    }
                    if (integrante != integrantes[integrantes.length - 1]) {
                        integrantes_string += ', '
                    }
                }


                let container = document.createElement('div')
                let card = document.createElement('div')
                let card_body = document.createElement('div')
                let card_title = document.createElement('h5')
                let card_text = document.createElement('p')
                let card_btn = document.createElement('a')

                container.className = 'col-sm-6 mt-3 mb-3'
                card.className = 'card'
                card_body.className = 'card-body'
                card_title.className = 'card-title'
                card_text.className = 'card-text'
                card_btn.className = 'btn btn-primary'
                card_btn.href = '/dashboard'
                container.appendChild(card)
                card.appendChild(card_body)
                card_body.appendChild(card_title, card_text, card_btn)
                card_body.appendChild(card_text)
                card_body.appendChild(card_btn)


                card_title.innerHTML = carteira.name
                card_btn.innerText = 'Acessar'
                card_text.innerHTML = `Integrantes: ${integrantes_string}`
                tela.appendChild(container)
            }
        }

    } else {
        let message = await requisicao.json()
        window.alert(message)
    }
}
populate()