const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        let userInfo = `<div class="info">
                             <img src="${user.avatarUrl}" alt="Foto do perfil"/>
                            <div class="data">
                                <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                                 <p>${user.bio ?? "Não possui bio cadastrado 😥"}</p>
                                 <span> 👥 Seguidores: ${user.followers ?? "Não possui seguidores cadastrado 😥"}</span><br>
                                 <span> 🔗 Seguindo: ${user.following ?? "Ninguém ainda segue 😥"}</span>  
                            </div>
                        </div>`

        this.userProfile.innerHTML = userInfo;

        let repositoriesItens = "";

        user.repositories.forEach(repo => {
            repositoriesItens += ` 
                <li class="repository-item">
                    <a href="${repo.html_url}" target="_blank" class="repository-name">${repo.name}</a>
                    <div class="repository-details">
                        <span class="icon">🍴 ${repo.forks}</span>
                        <span class="icon">⭐ ${repo.stargazers_count}</span>
                        <span class="icon">👀 ${repo.watchers}</span>
                        <span class="icon">👨‍💻 ${repo.language}</span>
                    </div>
                </li>
            `;
        });
        
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
    },

    // Função para renderizar eventos
    renderEvents(user) {
        if (user.events.length > 0) {
            let eventsHTML = '<h2>Eventos</h2><ul class="event-list">';
            user.events.forEach(event => {
                const isPushEvent = event.type === "PushEvent";
                const repoName = isPushEvent ? event.repo.name : null;
                const commitMessage = isPushEvent ? event.payload.commits[0]?.message || "Sem mensagem de commit" : "Sem mensagem de commit";

                if (isPushEvent) {
                    eventsHTML += `<li class="event-item">
                                        <strong>Repositório:</strong> ${repoName} - Mensagem: ${commitMessage}
                                    </li>`;
                } else {
                    eventsHTML += `<li class="event-item">${commitMessage}</li>`;
                }
            });
            eventsHTML += '</ul>';

            this.userProfile.innerHTML += `<div class="events section">${eventsHTML}</div>`;
        }
    },


    renderNotFound() {
        this.userProfile.innerHTML = "Usuário não encontrado"
    }
}

export { screen }