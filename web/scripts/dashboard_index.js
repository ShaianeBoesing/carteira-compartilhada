let saida_valor = document.getElementsByClassName('saida_valor')[0]
let entrada_valor = document.getElementsByClassName('entrada_valor')[0]
let total_valor = document.getElementsByClassName('total_valor')[0]
let lista = document.getElementById('tabela')


let x = fetch('http://localhost:3000/users/create',{method:'GET',mode: 'no-cors'})
x.then(i => console.log(i))


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
