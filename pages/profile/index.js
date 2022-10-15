let newUserData = JSON.parse(localStorage.getItem('newUserData'))
let newUserRepos = JSON.parse(localStorage.getItem('newUserRepos'))

let name = newUserData.name ? newUserData.name : newUserData.login;
let bio = newUserData.bio ? newUserData.bio : "Full Stack Developer";

let title = document.querySelector("title");
title.innerText = name;

let favIcon = document.querySelector(".favicon");
favIcon.href = newUserData.avatar_url;

let main = document.querySelector("main");

function header() {
  main.insertAdjacentHTML(
    "beforeend",
    ` <header> 
               <span class='container-left'>
                  <figure>
                     <img src='${newUserData.avatar_url}' class='user-img'>
                  </figure>
                  <span class='profile-desc-container'>
                     <h2 class='user-name'>${name}</h2>
                     <p class='user-job'>${bio}</p>
                  </span>
               </span>
               <span class='container-right'>
                  <button class='user-email-btn'>Email</button>
                  <button class='change-user-btn' onClick={window.location.replace("/index.html")}>Trocar de usuário</button>
               </span>
            </header>`
  );
}

function repos() {
  main.insertAdjacentHTML("beforeend", `<ul class='repos-list'></ul>`);

  let ul = document.querySelector(".repos-list");

  newUserRepos.forEach((repo) => {
    ul.insertAdjacentHTML(
      "beforeend",
      `
               <li class='repo'>
                  <h2 class='repo-title'>${repo.name}</h2>
                  <p class='repo-desc'>   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, suscipit obcaecati. Laudantium sed ex animi voluptatum blanditiis iusto corrupti, tenetur distinctio, unde suscipit vel neque voluptates officiis est repellat. Sunt!</p>
                 <span>
                     <a href='${repo.html_url}' target=_blank>
                        <button class='repo-btn'>Repositório</button>
                     </a>
                     <a href='https://${newUserData.login}.github.io/${repo.name}' target=_blank>
                        <button class='demo-btn'>Demo</button>
                     </a>
                 </span>
               </li>
            `
    );
  });
}

header();
repos();
