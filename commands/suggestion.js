const { DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'suggestion',
    description: 'criando uma mensagem embed para sugestão!',
    execute(client, message, segundoParametro,Discord){
        if(message.channel.type === 'DM'){
            const exEmbed = new Discord.MessageEmbed()
            .setColor('FADF2E')
            .setTitle('Envie sua sugestão no servidor.')
            .setDescription('Vá para a aba de sugestões e deixe lá seu palpite. 😉')
            message.reply({embeds:[exEmbed]});
        } else {
            const channel = message.guild.channels.cache.find(c => c.name === 'SUGGESTION_CHANNEL');
            const sugestao = new Discord.MessageEmbed()
                .setColor('FADF2E')
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle('Minha sugestão/feedback')
                .setDescription(segundoParametro);

            if(!segundoParametro){
                const exEmbed = new Discord.MessageEmbed()
                .setColor('FADF2E')
                .setTitle('Escreva sua sugestão logo após o comando.')
                .setDescription('Exemplo: \n !palpite mandar satoshis para os programadores. 😉')
                message.channel.send({embeds:[exEmbed]});

            } else if (channel){
                channel.send({ embeds: [sugestao] }).then((msg) =>{
                    msg.react('👍');
                    msg.react('👎');
                    message.delete();
                }).catch((err)=>{
                    throw err;
                });
            } else {
                message.channel.send('Não há um canal para sugestões 😢');
            }
        }
        
    }
}