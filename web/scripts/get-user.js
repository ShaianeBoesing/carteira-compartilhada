document.addEventListener("DOMContentLoaded", async () => {

  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
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
    password.value = response.data.password;
    id = response.data.id;
  }
  else {
    window.alert(requisicao.message);
  }
})

const alterar = async (trigger) => {
  let input = trigger.previousElementSibling;
  let button = document.querySelector('#alterar-nome');
  if (input.getAttribute('data-mode') === 'default') {
    button.disabled = true;
    input.value = "";
    input.setAttribute('placeholder', 'Digite o novo nome');
    button.innerHTML = 'Confirmar';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    input.setAttribute('data-mode', 'changing')
    button.disabled = false;
    return;
  }
  button.disabled = true;
  input.setAttribute('data-mode', 'default');
  button.innerHTML = 'Alterar';
  button.style.backgroundColor = 'white';
  button.style.color = 'grey';

  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const id = '63896a15ece7dbe22765d3da';

  const url_store = `/users/${id}`;

  let data = {
    name: username.value,
    email: email.value,
    password: password.value
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
    password.value = response.user.password;
    id = response.user._id;
  }
  else {
    window.alert(requisicao.message);
  }
  button.disabled = false;
}

function hidePassWord() {
  var password = document.getElementById("password");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
