import { baseUrl } from '../variables.js';

//buscando dados do usuário com a API do GitHub
async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`);
    return await response.json()
}

export {getUser};