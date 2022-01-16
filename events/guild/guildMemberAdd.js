const Config = require('config');

module.exports = (Discord, client, member) => {
    const adminDm = client.users.cache.get('ADMIN');
    client.commands.get('novoMembro').execute(client, member, adminDm, Discord);  

}