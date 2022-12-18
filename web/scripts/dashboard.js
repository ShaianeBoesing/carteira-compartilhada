document.addEventListener('DOMContentLoaded', async () => {
    categories();
    getUserByWallet();
    getWallet();
});

const categories = async () => {
    const url = '/categories';
    const fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    const requisicao = await fetch(url, fetchData);
    const jason = await requisicao.json();
    const data = jason.data;
    console.log(data);

    const dropdown = document.getElementById('categoria');
    data.forEach(categoria => {
        let option = document.createElement('option');
        const cat = categoria.type === 'Saida' ? '(-)' : '(+)'
        option.innerHTML = `${categoria.name} ${cat}`;
        option.setAttribute("value", `${categoria._id}`);
        dropdown.appendChild(option);
    });
};

const getUserByWallet = async () => {
    let urlSplitada = document.URL.split('/');
    urlSplitada = urlSplitada[urlSplitada.length - 1];
    const integrantesFetch = await fetch(`/users_wallets/users/w/${urlSplitada}`);
    const response = await integrantesFetch.json();
    const data = response.data;
};

const getWallet = async () => {
    let urlSplitada = document.URL.split('/');
    urlSplitada = urlSplitada[urlSplitada.length - 1];
    const carteira = await fetch(`/wallets/${urlSplitada}`);
    const response = await carteira.json();
    const data = response.data;
    document.getElementById('nome-carteira').innerHTML = `${data[0].name}`;
    document.getElementById('total-carteira').innerHTML = `R$ ${data[0].total.toFixed(2)}`;
};

const getMovements = async () => {

};

async function atualizar_dados() {
    let urlSplitada = document.URL.split('/');
    urlSplitada = urlSplitada[urlSplitada.length - 1];

    const value = document.querySelector("#valor").value;
    const category_id = document.getElementById("categoria").value;
    const description = document.querySelector("#descricao").value;

    const url = `/wallets_moviments/w/${urlSplitada}`;

    const dataToSend = {
        category_id : category_id,
        value : parseInt(value),
        description : description
    }

    const fetchData = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    const requisicao = await fetch(url, fetchData);
    const jason = await requisicao.json();

    document.getElementById('total-carteira').innerHTML = `R$ ${jason.wallet.total.toFixed(2)}`;
}