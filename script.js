let users = JSON.parse(localStorage.getItem('users')) || [];
let userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

function myFunction() {
  let form = document.getElementById("form");
  if (form) {
    form.remove();
  }

  form = document.createElement("form");
  form.setAttribute("id", "form");
  form.setAttribute("onsubmit", "event.preventDefault(); createUser();");

  let name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("id", "name");
  name.setAttribute("placeholder", "Nome");

  let email = document.createElement("input");
  email.setAttribute("type", "email");
  email.setAttribute("id", "email");
  email.setAttribute("placeholder", "Email");

  let enviar = document.createElement("input");
  enviar.setAttribute("type", "submit");
  enviar.setAttribute("value", "enviar");

  let limpar = document.createElement("input");
  limpar.setAttribute("type", "button");
  limpar.setAttribute("value", "limpar");
  limpar.setAttribute("onclick", "clearForm();");

  form.appendChild(name);
  form.appendChild(email);
  form.appendChild(enviar);
  form.appendChild(limpar);

  const formDiv = document.getElementById('form-div')
  formDiv.appendChild(form);
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function createUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let date = new Date();

  if (name === "" || email === "") {
    alert("Os campos Nome e Email não podem estar vazios.");
    return;
  }

  let existingUser = users.find(user => user.email === email);
  if (existingUser) {
    alert("O email já está em uso.");
    return;
  }

  let user = {id: userId++, name: name, email: email, date: date};
  users.push(user);

  localStorage.setItem('users', JSON.stringify(users));

  document.getElementById("form").remove();

  displayUsers();
}

function deleteUser(id) {
  users = users.filter(function(user) {
    return user.id !== id;
  });

  localStorage.setItem('users', JSON.stringify(users));

  displayUsers();
}

function deleteAllUsers() {
  users = [];

  localStorage.removeItem('users');

  displayUsers();
}

function searchUsers() {
  let search = document.getElementById("search").value.toLowerCase();

  let filteredUsers = users.filter(function(user) {
    return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
  });

  displayUsers(filteredUsers);
}

function displayUsers(filteredUsers) {
  let userList = document.getElementById("userList");
  userList.innerHTML = "";

  let displayUsers = filteredUsers || users;

  displayUsers.forEach(function(user) {
    let userElement = document.createElement("p");
    userElement.textContent = "ID: " + user.id + ", Nome: " + user.name + ", Email: " + user.email + ", Data: " + user.date;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = function() {
      deleteUser(user.id);
    };

    userElement.appendChild(deleteButton);
    userList.appendChild(userElement);
  });
}

displayUsers();
