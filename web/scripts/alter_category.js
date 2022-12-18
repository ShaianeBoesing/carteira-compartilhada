const populate = async () => {
    const url = '/categories';

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

            let option = document.createElement('option')
            option.className = ''
            option.value = carteira._id
            option.innerHTML = carteira.name
            form.appendChild(option)

        }
        if (form.length === 0) {
            const corpo = document.getElementById('corpo')
            const mensagem = document.createElement('h2')
            let card_btn = document.createElement('a')
            card_btn.className = 'btn btn-success btn-block btn-lg gradient-custom-4 text-body'
            card_btn.href = '/'
            card_btn.innerHTML = 'Voltar'
            mensagem.innerHTML = 'Não há categorias a serem alteradas.'
            mensagem.className = 'text-uppercase text-center'
            corpo.replaceChildren(mensagem, card_btn)
        }

    } else {
        let message = await requisicao.json()
        window.alert(message)
    }
}
populate()

const alter_category = async () => {
    const id_categoria_selecionada = document.getElementById('form')
    const nome = document.querySelector('#nome').value;
    const type = document.querySelector('#form2').value;

    const url_delete = '/categories/' + id_categoria_selecionada.value
    
    let data = {
        name: nome,
        type: type
    }

    const fetchData = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }


    const promisse = await fetch(url_delete, fetchData)
    if (promisse.status == 201) {
        const corpo = document.getElementById('corpo')
        const mensagem = document.createElement('h2')
        let card_btn = document.createElement('a')
        card_btn.className = 'btn btn-success btn-block btn-lg gradient-custom-4 text-body'
        card_btn.href = '/categories/alter'
        card_btn.innerHTML = 'Voltar'
        mensagem.innerHTML = 'Categoria alterada com sucesso'
        mensagem.className = 'text-uppercase text-center'
        corpo.replaceChildren(mensagem, card_btn)
    }
}