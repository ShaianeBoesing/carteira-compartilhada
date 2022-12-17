document.addEventListener("DOMContentLoaded", async () => {
  let username = document.querySelector('#username');
  let email = document.querySelector('#email');
  let id;

  const url_store = '/users/get';

  let fetchData = {
    method: 'GET',
    body: JSON.stringify(),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  let requisicao = await fetch(url_store, fetchData);
  let status = requisicao.status;
  console.log(status);
  if (status === 201) {
    let response = await requisicao.json();
    username.value = response.data.name;
    email.value = response.data.email;
    id = response.data._id;
  }
  else {
    window.alert(requisicao.message);
  }
})

const change = async () => {
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  let id = '63896a15ece7dbe22765d3da';
  const button = document.querySelector('#alterar');

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

