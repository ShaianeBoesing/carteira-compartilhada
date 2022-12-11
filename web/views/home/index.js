let saida_valor = document.getElementsByClassName('saida_valor')[0]
let entrada_valor = document.getElementsByClassName('entrada_valor')[0]
let total_valor = document.getElementsByClassName('total_valor')[0]
let lista = document.getElementsByClassName('list-group')[0]


function create_list_item(){
    const li = document.createElement('li')
    const div_row = document.createElement('div')
    const div_col1 = document.createElement('col')
    const div_col2 = document.createElement('col')
    const div_col3 = document.createElement('col')
    li.className='list-group-item'
    div_row.className='row'
    div_col1.className = 'col-sm-2'
    div_col2.className = 'col-sm-8'
    div_col3.className = 'col-sm-2'
    div_col1.innerHTML='11/12/2002'
    div_col2.innerHTML='Item comprado'
    div_col3.innerHTML='$XX,XX'
    li.appendChild(div_row)
    div_row.appendChild(div_col1)
    div_row.appendChild(div_col2)
    div_row.appendChild(div_col3)
    lista.appendChild(li)

}

function atualizar_dados() {
    saida_valor.innerHTML = 'xxxx'
    entrada_valor.innerHTML = 'yyyy'
    total_valor.innerHTML = 'zzzz'
    create_list_item()
}
