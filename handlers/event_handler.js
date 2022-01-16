const fs = require('fs');

module.exports = (client, Discord) => {
    const load_diretory = (diretory) => {
        const event_files = fs.readdirSync(`./events/${diretory}`).filter(file => file.endsWith('.js'));

        for(const file of event_files){
            const event = require(`../events/${diretory}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));
        }
    }

    ['client', 'guild'].forEach(e => load_diretory(e));
    
}