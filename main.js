const Discord = require('discord.js');
const Config = require('config');
require('dotenv').config();
const {Client, Intents, Message}  = require('discord.js');
const client = new Client({
    partials:  ['MESSAGE','CHANNEL','REACTION'],
    intents: [
       Intents.FLAGS.GUILDS,
       Intents.FLAGS.GUILD_PRESENCES,
       Intents.FLAGS.GUILD_MEMBERS,
       Intents.FLAGS.GUILD_MESSAGES,
       Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
       Intents.FLAGS.DIRECT_MESSAGES,
       Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ]    
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(Config.get('DISCORD_TOKEN'));