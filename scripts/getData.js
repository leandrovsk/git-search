!localStorage.getItem("gitUsers") ? localStorage.setItem("gitUsers", JSON.stringify([])) : null;

async function getUserData(username) {
  try {
    let userData = await fetch(`https://api.github.com/users/${username}`);
    let userRepos = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    let userDataJson = await userData.json();
    let userReposJson = await userRepos.json();

    localStorage.setItem("newUserData", JSON.stringify(userDataJson));
    localStorage.setItem("newUserRepos", JSON.stringify(userReposJson));

    function addUser() {
      let localArr = JSON.parse(localStorage.getItem("gitUsers"));

      let exists = localArr.find((user) => {
        return user.login === userDataJson.login;
      });

      if (!exists) {
        let newLocalArr = [...localArr, userDataJson];
   
        if (newLocalArr.length > 3) {
          newLocalArr.splice(0, 1);
        }
        localStorage.setItem("gitUsers", JSON.stringify(newLocalArr));
      }
    }

    addUser();

  } catch (err) {
    console.log(err);
  }
}
