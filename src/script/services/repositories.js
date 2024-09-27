import { baseUrl, repositoriesQuantity } from '../variables.js';


//buscando dados do repositorio do usuário com a API do GitHub
async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`); 
    //essa parte(?per_page=10)busca apenas 10 projetos do repositorio
    return await response.json()
}

export {getRepositories};