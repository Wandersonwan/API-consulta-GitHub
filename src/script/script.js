
document.getElementById("btn-search").addEventListener("click", () => {
    const userName = document.getElementById("input-search").value
    userInfoProfile(userName)
})


async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    return await response.json()
}
async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`);
    return await response.json()
}

function userInfoProfile(userName) {

    user(userName).then(userDate => {
        let infoUser = `  <div class="info"> 
                                <img src="${userDate.avatar_url}"/>
        
                                <div class="carta">
                                    <h1>${userDate.name ?? "Não possui nome cadastrado"}</h1>
                                    <p>${userDate.bio ?? "Não possui bio"}</p>
                        
                                </div>
                            </div>
                        `
        document.querySelector(".profile-data").innerHTML = infoUser

        getUserRepositories(userName)
    })
}

function getUserRepositories(userName) {
    repos(userName).then(reposDate => {
        let repositoriesItens = ""
        reposDate.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blanck">${repo.name}</a></li>`
        })

        document.querySelector(".profile-data").innerHTML += `  <div class="repositories section">
                                                                    <h2>Repositorios</h2> 
                                                                    <ul>${repositoriesItens}</ul>
                                                                </div>`

    })
}







