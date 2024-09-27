import { getUser } from './services/user.js';
import { getRepositories } from './services/repositories.js';
import { getEvents } from './services/events.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';


//buscando o ID do botão e input do HTML
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName);
})

// Evento para a tecla Enter no campo de busca
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = document.getElementById('input-search').value
    if (e.key === "Enter") {
    if (validateEmptyInput(userName)) return
    getUserData(userName);
    }
})

// função para validar o input e a tecla enter. Se ele for == 0 dá um alert
function validateEmptyInput (userName) {
    if (userName.length === 0) {
        alert("Preencha o campo com o nome do usuário do GitHub")
        return true
    }
}

// Função principal para buscar dados do usuário
async function getUserData(userName) {
    const userResponse = await getUser(userName);

    if(userResponse.message ==="Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    
    screen.renderUser(user)
    screen.renderEvents(user);
}





