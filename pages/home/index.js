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
            <input type="text" id='user-seach-input' placeholder='Digite um usuário do github aqui...'>
            <button class='user-search-btn'>Ver perfil do github</button>
         </span>
      </span>
   </aside>`
  );
}

asideRight();

async function renderLastUser(login) {
   await getUserData(login);
   window.location.replace("/pages/profile/index.html");
}

function lastUsers() {
  let recentUsers = document.querySelector(".recent-users");

  const localUsers = JSON.parse(localStorage.getItem("gitUsers"));

  localUsers.forEach((user) => {
   recentUsers.insertAdjacentHTML('afterbegin', `
      <figure>
         <img src='${user.avatar_url}' class='user-img' onClick={renderLastUser('${
         user.login}')}>
      </figure>
   `)
  })
}

lastUsers()

function events() {
  let searchBtn = document.querySelector(".user-search-btn");

  if (!searchBtn.classList.contains("faded"))
    searchBtn.addEventListener("click", async (event) => {
      let userName = event.target.previousElementSibling.value;
      let response = (await fetch(`https://api.github.com/users/${userName}`))
        .status;
      if (response === 200) {
        await getUserData(userName);
        window.location.replace("/pages/profile/index.html");
      } else {
        alert("Wrong username");
      }
    });
}

events();
