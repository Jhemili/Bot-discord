const Config = require('config');

module.exports = (Discord, client, message) => {
    const prefix = 'PREFIX';

    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    var args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    var segundoParametro = message.content.slice(prefix.length + cmd.length);
    const command = client.commands.get(cmd);

    if(command) command.execute(client, message, segundoParametro, Discord);
}