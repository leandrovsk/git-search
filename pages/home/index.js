const main = document.querySelector("main");

function asideLeft() {
  main.insertAdjacentHTML(
    "beforeend",
    `<aside class='aside-left'>
         <span class='aside-left-container'>
            <h1>Git Search</h1>
            <h2>Encontre e se conecte com profissionais de forma rápida e fácil</h2>
            <span>
               <p>Achados Recentimente:</p>
               <ul class='recent-users'></ul>
            </span>
         </span>
      </aside>`
  );
}

asideLeft();

function asideRight() {
  main.insertAdjacentHTML(
    "beforeend",
    `<aside class='aside-right'>
      <span class='aside-right-container'>
         <h2>Procurar por um usuário</h2>
         <span>
            <label for="user-search-input">Usuário github</label>
            <input type="text" id='user-search-input' placeholder='Digite um usuário do github aqui...'>
            <p class='user-search-alert'>Usuário não encontrado</p>
            <button class='user-search-btn faded'>Ver perfil do github</button>
         </span>
      </span>
   </aside>`
  );
}

asideRight();

function lastUsers() {
  let recentUsers = document.querySelector(".recent-users");

  const localUsers = JSON.parse(localStorage.getItem("gitUsers"));

  localUsers.forEach((user) => {
    recentUsers.insertAdjacentHTML(
      "afterbegin",
      `
      <li class='recent-users-container' onClick=renderLastUser('${user.login}')>
         <figure>
         <img src='${user.avatar_url}' class='user-img'>
         </figure>
         <p>Acessar este perfil</p>
      </li>
   `
    );
  });
}

lastUsers();

async function renderLastUser(login) {
  addSpinner()
  await getUserData(login);
  window.location.replace("/pages/profile/index.html");
}

const searchBtn = document.querySelector(".user-search-btn");
const searchAlert = document.querySelector(".user-search-alert");
const searchInput = document.querySelector("#user-search-input");

function addSpinner() {
  let img = document.createElement("img");
  img.classList.add("loading");
  img.src = "/src/img/spinner.svg";
  img.alt = "Spinner";

  searchBtn.innerHTML = "";
  searchBtn.appendChild(img);
  searchBtn.classList.add("faded");
}

function events() {
  async function checkResponse() {
    let userName = searchInput.value;
    let response = (await fetch(`https://api.github.com/users/${userName}`))
      .status;
    if (response === 200) {
      await getUserData(userName);
      window.location.replace("/pages/profile/index.html");
    } else {
      searchAlert.classList.add("alert");
      searchInput.value = "";
      searchBtn.classList.add("faded");
      searchBtn.innerHTML = ''
      searchBtn.innerText = 'Ver perfil do github'
    }
  }

  searchBtn.addEventListener("click", async (event) => {
    if (!searchBtn.classList.contains("faded")) {
      addSpinner();
      checkResponse();
    }
  });

  searchInput.addEventListener("keyup", async (event) => {
    if (searchInput.value === "") {
      searchBtn.classList.add("faded");
    } else {
      searchBtn.classList.remove("faded");
      searchAlert.classList.remove("alert");
    }
    if (event.key === "Enter") {
      if (!searchBtn.classList.contains("faded")) {
        addSpinner();
        checkResponse();
      }
    }
  });
}

events();
