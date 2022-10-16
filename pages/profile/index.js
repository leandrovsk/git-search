let newUserData = JSON.parse(localStorage.getItem("newUserData"));
let newUserRepos = JSON.parse(localStorage.getItem("newUserRepos"));

let name = newUserData.name ? newUserData.name : newUserData.login;
let bio = newUserData.bio
  ? newUserData.bio
  : "This user does not have a bio description";

let descExample =
  "Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like";

let email = newUserData.email;

let emailClass = "";

if (email === null) {
  emailClass = "disable";
}

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
               <p class='user-bio'>${bio}</p>
            </span>
         </span>
         <span class='container-right'>
            <a href='mailto:${email}' class='${emailClass}'><button class='user-email-btn'>Email</button></a>
            <button class='change-user-btn' onClick={window.location.replace("/index.html")}>Trocar de usuário</button>
         </span>
      </header>`
  );
}

function repos() {
  main.insertAdjacentHTML("beforeend", `<ul class='repos-list'></ul>`);

  let ul = document.querySelector(".repos-list");

  newUserRepos.forEach((repo) => {

   let desc = repo.desc ? repo.desc : descExample;

    let demoClass = "";

    if (!repo.has_pages) {
      demoClass = "disable";
    } 

    ul.insertAdjacentHTML(
      "beforeend",
      `<li class='repo'>
         <h2 class='repo-title'>${repo.name}</h2>
         <p class='repo-desc'>${desc}</p>
         <span>
            <a href='${repo.html_url}' target=_blank>
               <button class='repo-btn' id='repo-btn'>Repositório</button>
            </a>
            <a href='https://${newUserData.login}.github.io/${repo.name}' target=_blank class='${demoClass}'>
               <button class='demo-btn'>Demo</button>
            </a>
         </span>
      </li>`
    );
  });
}

header();
repos();
