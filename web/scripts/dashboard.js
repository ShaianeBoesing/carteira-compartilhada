document.addEventListener('DOMContentLoaded', async () => {
    categories();
    getUserByWallet();
    getWallet();
    getMovements();
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
    let urlSplitada = document.URL.split('/');
    urlSplitada = urlSplitada[urlSplitada.length - 1];

    const url = ` /wallets_moviments/all/w/${urlSplitada}`;

    const fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    const requisicao = await fetch(url, fetchData);
    const jason = await requisicao.json();
    const data = jason.data;
    data.reverse();

    const tabel = document.querySelector("#tabela");
    tabel.innerHTML = "";
    data.forEach(async movement => {
        const carteira = await fetch(`/categories/${movement.category_id}`);
        const response = await carteira.json();
        const sinal = response.data[0].type === 'Saida' ? '-' : '&nbsp';
        let tr = document.createElement("tr");
        let td = [];
        let tdData = document.createElement("td");
        let time = formatarDataPadraoFrontend(movement.createdAt);
        tdData.innerHTML = `${time}`;
        let tdDescricao = document.createElement("td");
        tdDescricao.innerHTML = `${movement.description}`;
        let tdValue = document.createElement("td");
        tdValue.innerHTML = `${sinal}R$${movement.value.toFixed(2)}`;
        td.push(tdData);
        td.push(tdDescricao);
        td.push(tdValue);
        td.forEach(i => tr.appendChild(i));
        tabel.appendChild(tr);
    });
};

async function atualizar_dados() {
    let urlSplitada = document.URL.split('/');
    urlSplitada = urlSplitada[urlSplitada.length - 1];

    const value = document.querySelector("#valor");
    const category_id = document.getElementById("categoria");
    const description = document.querySelector("#descricao");

    if (value.value !== '' && description.value !== '') {

        const url = `/wallets_moviments/w/${urlSplitada}`;

        const dataToSend = {
            category_id: category_id.value,
            value: parseInt(value.value),
            description: description.value
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
        getMovements();
    }
}

const formatarDataPadraoFrontend = function (date) {
    const dateString = date.slice(0, 10);
    let dia = dateString.slice(-2);
    let mes = dateString.slice(5, 7);
    let ano = dateString.slice(0, 4);
    return (dia + '/' + mes + '/' + ano);
}