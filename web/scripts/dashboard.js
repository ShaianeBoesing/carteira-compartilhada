document.addEventListener('DOMContentLoaded', async () => {
    categories();
    getUserByWallet();
    getWallet();
});

const categories = async () => {
    const url = '/categories';

    const form = document.getElementById('form')

    const fetchData = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    const requisicao = await fetch(url, fetchData);
    const jason = await requisicao.json();
    const data = jason.data;

    const dropdown = document.getElementById('categoria');
    data.forEach(categoria => {
        let option = document.createElement('option');
        const cat = categoria.type === 'Saida' ? '(-)' : '(+)'
        option.innerHTML = `${categoria.name} ${cat}`;
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
    document.getElementById('nome-carteira').
    console.log(data);
};

let saida_valor = document.getElementsByClassName('saida_valor')[0]
let entrada_valor = document.getElementsByClassName('entrada_valor')[0]
let total_valor = document.getElementsByClassName('total_valor')[0]
let lista = document.getElementById('tabela')


let x = fetch('http://localhost:3000/users/create',{method:'GET',mode: 'no-cors'})
function create_list_item(){
    const li = document.createElement('tbody')
    const div_row = document.createElement('tr')
    const div_col1 = document.createElement('td')
    const div_col2 = document.createElement('td')
    const div_col3 = document.createElement('td')
    div_col1.innerHTML='11/12/2002'
    div_col2.innerHTML='Item comprado'
    div_col3.innerHTML='$XX,XX'
    div_row.appendChild(div_col1)
    div_row.appendChild(div_col2)
    div_row.appendChild(div_col3)
    lista.appendChild(div_row)
}

function atualizar_dados() {
    saida_valor.innerHTML = 'xxxx'
    entrada_valor.innerHTML = 'yyyy'
    total_valor.innerHTML = 'zzzz'
    create_list_item()
}