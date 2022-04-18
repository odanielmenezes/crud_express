var filmes = [];
var method = "POST";
var index = 0;
var valueOk = false;
var input = document.getElementById('input-pesquisa');
var busca = []

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("myParam");
console.log("myParam", location);

window.onload = getData(filmes);
async function getData(users) {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json().then(
    (res) => (
      (filmes = res),
      (users =
        res.length === 0
          ? "NO DATA"
          : res.map(
              (item) =>
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
            ))
    )
  );
  if (users === "NO DATA") {
    document.getElementById("oi").innerHTML =
      document.getElementById("oi").innerHTML + `<div>${busca}</div>`;
  } else {
    document.getElementById("oi").innerHTML = users;
  }
}


input.addEventListener('change', updateValue);

function updateValue(e) {
  const str = filmes.map(user => user.nome + " " + user.sobrenome)
  const filtrado = str.filter((user) => user.startsWith(e.target.value))
  busca.push(filtrado)
  console.log(busca)
}

function onConfirmDelete() {
  deleteUser(index);
  closeModal();
}

function openModal(idUser) {
  const user = filmes.find(e => e.id == idUser);
  document.querySelector('.none').classList.add('modal')
  document.getElementById('info-confirm').innerHTML = `<div>Deseja deletar o usuário <br /><b>${user.nome + " " + user.sobrenome}</b> ?</div>`
  index = idUser;
}

function closeModal() {
  console.log(document.querySelector('.none').classList.remove('modal'))
}

function deleteUser(idUser) {
  fetch(`http://localhost:3000/delete/${idUser}`, {
    method: "DELETE",
  });
  attScreen();
}

function editUser(idUser) {
  method = "PUT";
  const dados = filmes.find((e) => e.id == idUser);
  index = dados.id;
  console.log(dados);
  if (dados) {
    document.getElementById("nome").value = dados.nome;
    document.getElementById("sobrenome").value = dados.sobrenome;
  }
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
      method: method,
      headers: {
        Accept: "application/json, text/plain, */*",
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
      method: method,
      headers: {
        Accept: "application/json, text/plain, */*",
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
