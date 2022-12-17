const create_category = async () => {
    const nome = document.querySelector('#nome').value;
    const type = document.querySelector('#form').value;

    const url = '/categories';

    let data = {
        name: nome,
        type: type
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
        const div = document.createElement('div')
        const corpo = document.getElementById('corpo')
        const mensagem = document.createElement('h2')
        let card_btn = document.createElement('a')
        card_btn.className = 'btn mt-4 btn-success btn-block btn-lg gradient-custom-4 text-body'
        card_btn.href = '/categories/create'
        card_btn.innerHTML = 'Voltar'
        mensagem.innerHTML = 'Categoria criada com sucesso!'
        mensagem.className = 'text-uppercase text-center'
        div.appendChild(mensagem)
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