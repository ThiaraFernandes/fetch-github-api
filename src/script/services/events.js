import { baseUrl, items } from '../variables.js';
import { user } from '../objects/user.js';

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${items}`);
    const data = await response.json();

    //Filtrar eventos
    const filterEvents = data
        .filter(event => event.type === 'CreateEvent' || event.type === "PushEvent")
       
    
    user.setEvents(filterEvents);
    console.log('Eventos do usuário:', user.events);

}

export { getEvents };
