const Config = require('config');
const { DiscordAPIError } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List of all commands.',
    execute(client, message, args, Discord){
        const user = message.author.id;
        const helpEmbed = new Discord.MessageEmbed()
        .setColor([153,0,76])
        .setTitle('TITLE')
        .setDescription(`<@!${user}>`)
        .addFields( 
            {name: 'COMANDOS', value: 'DESCRIÇÃO DO COMANDO'},
            {name: '------------', value: 'Não há distinção de letra maíuscula ou minúscula para o nome dos comandos. 😉'});
            
        
        if(message.channel.type === 'DM'){
            message.author.send({ embeds: [helpEmbed] });
        } else {
            if(botChannel){
                botChannel.send({ embeds: [helpEmbed] }).then((msg)=>{
                    msg.react('🤖');
                    message.delete();
                }).catch((err)=>{
                    throw err;
                }); 
            } 
                   
        }     
        
    }

}