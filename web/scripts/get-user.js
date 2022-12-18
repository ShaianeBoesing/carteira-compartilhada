document.addEventListener("DOMContentLoaded", async () => {
  let username = document.querySelector('#username');
  let email = document.querySelector('#email');

  const url_get = '/users/get';

  let fetchData = {
    method: 'GET',
    body: JSON.stringify(),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  let requisicao = await fetch(url_get, fetchData);
  let status = requisicao.status;
  console.log(status);
  if (status === 201) {
    let response = await requisicao.json();
    username.value = response.data.name;
    email.value = response.data.email;
  }
  else {
    window.alert(requisicao.message);
  }
})

const change = async () => {
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  let id;
  const button = document.querySelector('#alterar');

  const url = '/users/get';
  let fetchDados = {
    method: 'GET',
    body: JSON.stringify(),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  let request = await fetch(url, fetchDados);
  let stat = request.status;
  if (stat === 201) {
    let response = await request.json();
    id = response.data._id;
  }
  else {
    window.alert(requisicao.message);
  }

  if (button.getAttribute('data-mode') === 'default') {
    button.setAttribute('data-mode', 'changing');
    username.disabled = false;
    button.disabled = true;
    button.innerHTML = 'Confirmar';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    button.disabled = false;
    return
  }
  button.setAttribute('data-mode', 'default');
  button.innerHTML = 'Alterar';
  button.style.backgroundColor = 'white';
  button.style.color = 'grey';

  const url_store = `/users/${id}`;

  let data = {
    id: id,
    name: username.value,
    email: email.value,
  }

  let fetchData = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  let requisicao = await fetch(url_store, fetchData);
  let status = requisicao.status;
  if (status === 201) {
    let response = await requisicao.json();
    username.value = response.user.name;
    email.value = response.user.email;
    id = response.user._id;
  }
  else {
    window.alert(requisicao.message);
  }
  button.disabled = false;
}

