var usuarios = [];
var method = "POST";
var index = 0;
var valueOk = false;
var input = document.getElementById('input-pesquisa');
var busca = []

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("myParam");
console.log("myParam", location);

window.onload = getData(usuarios);
async function getData(users) {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json().then(
    (res) => (
      (usuarios = res),
      (users =
        res.length === 0
          ? "NO DATA"
          : res.map(
            item =>
              `<div id="data">
                <div class="users" id="users">
                  <div id="id">${item.id}</div>
                  <div class="first_name">${item.nome}</div>
                  <div class="last_name">${item.sobrenome}</div>
                </div>
                <div id="acoes">
                  <i id="edit-icon" onClick="editUser(${item.id})" class="fas fa-edit"></i>
                  <i id="delete-icon" onClick="openModal(${item.id})" class="fas fa-trash-alt"></i>
                </div>
              </div>`
          ).join(''))
    )
  );
  if (users === "NO DATA") {
    document.getElementById("oi").innerHTML =
      document.getElementById("oi").innerHTML + `<div>NO DATA</div>`;
  }
  else {
    document.getElementById("oi").innerHTML = users;
  }
console.log(usuarios)

}


for (let i = 0; i < document.getElementById('oi').childNodes.length; i++) {
  if (document.getElementById('oi').childNodes[i].nodeName == "#text") {
    document.getElementById('oi').childNodes[i].nodeName.toString().replace('')
  }
}

input.addEventListener('change', updateValue);

function updateValue(e) {
  var output = usuarios.filter(user => user.nome == e.target.value || user.sobrenome == e.target.value || user.id == e.target.value);
  if (output.length === 0) {
    openModalBusca(e.target.value)
  } else {
    var data = document.getElementById("oi").innerHTML = output.map(user => `<div id="data">
    <div class="users" id="users">
    <div id="id">${user.id}</div>
    <div class="first_name">${user.nome}</div>
    <div class="last_name">${user.sobrenome}</div>
    </div>
    <div id="acoes">
    <i id="edit-icon" onClick="editUser(${user.id})" class="fas fa-edit"></i>
    <i id="delete-icon" onClick="openModal(${user.id})" class="fas fa-trash-alt"></i>
    </div>
    </div>`
    ).join('')
  }
  console.log(output)
  busca.push(data)
}

function onConfirmDelete() {
  deleteUser(index);
  closeModal();
}

function openModalBusca(busca) {
  document.getElementById('button-deletar').innerText = "OK"
  document.querySelector('.none').classList.add('modal-busca')
  document.getElementById('info-confirm').innerHTML = `<div>Opa! Não encontramos usuários pela busca:<br /><b>${busca}</b></div>`
}

function openModal(idUser) {
  const user = usuarios.find(e => e.id == idUser);
  document.getElementById('button-deletar').innerText = "DELETAR"
  document.querySelector('.none').classList.add('modal')
  document.getElementById('info-confirm').innerHTML = `<div>Deseja deletar o usuário <br /><b>${user.nome + " " + user.sobrenome}</b> ?</div>`
  index = idUser;
}

function closeModal() {
  document.querySelector('.none').classList.remove('modal-busca')
  document.querySelector('.none').classList.remove('modal')
}

function deleteUser(idUser) {
  fetch(`http://localhost:3000/delete/${idUser}`, {
    method: "DELETE",
  });
  attScreen();
}

function editUser(idUser) {
  method = "PUT";
  const dados = usuarios.find((e) => e.id == idUser);
  index = dados.id;
  console.log(dados);
  if (dados) {
    document.getElementById("nome").value = dados.nome;
    document.getElementById("sobrenome").value = dados.sobrenome;
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function clearFields() {
  method = "POST";
  document.getElementById("nome").value = "";
  document.getElementById("sobrenome").value = "";
}

function addUser() {
  if (
    document.getElementById("nome").value == "" ||
    document.getElementById("sobrenome").value == ""
  ) {
    alert("Preencha os campos do formulário");
  } else {
    if (method === "POST") {
      const data = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value
      };
      console.log(data);
      fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          Accept: "application/json text/plain */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.error("Error", err));
      attScreen();
    } else if (method === "PUT") {
      var data = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
      };
      fetch(`http://localhost:3000/put/${index}`, {
        method: "PUT",
        headers: {
          Accept: "application/json text/plain */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      attScreen();
    }
  }
  clearFields();
}

function attScreen() {
  location.reload();
}
