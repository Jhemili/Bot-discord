module.exports = {
    name: 'search',
    description: 'Busca os termos digitados em um canal específico do YouTube',
    execute (client, message, segundoParametro, Discord){
        if (!segundoParametro){
            message.reply('Me diga o que buscar 😅');
        } else {
            youtube.search.list({
                q: segundoParametro, 
                part: 'snippet',
                maxResults: 5,
                type: 'video',
                fields: 'items(id(videoId), snippet(title, description, publishedAt))',
                channelId: 'CHANNEL_ID'
            }, function (err, resultado){
                if(err){
                    console.log(err);
                }
                if (resultado){
                    const listaResultados = [];
                    for(let i in resultado.data.items){
                        const montaItem = {
                            'tituloVideo': resultado.data.items[i].snippet.title,
                            'link': 'https://www.youtube.com/watch?v=' + resultado.data.items[i].id.videoId,
                            'descricao': resultado.data.items[i].snippet.description                         
                        }

                        listaResultados.push(montaItem);
                    }

                    const user = message.author.id;
                    const embed = new Discord.MessageEmbed()
                    .setColor([48,109,167])
                    .setAuthor('NAME_AUTHOR')
                    .setThumbnail('https://...')
                    .setDescription(`<@!${user}> Resultado da pesquisa: ${segundoParametro}`);

                    if(message.channel.type === 'DM'){
                        if (listaResultados.length === 0){
                            embed.addField('😥', 'Não encontrei nada, tente novamente.')
                            message.reply({ embeds: [embed] });
                        } else {
                            for (let i in listaResultados){
                                embed.addField(`${parseInt(i)+1}: ${listaResultados[i].tituloVideo}`, `[${listaResultados[i].descricao}](${listaResultados[i].link})`)
                            }
                            message.reply({ embeds: [embed] });
                        }

                    } else {
                        const botChannel = message.guild.channels.cache.find(c => c.name === 'BOT_CHANNEL');
                        if (botChannel){
                            if (listaResultados.length === 0){
                                embed.addField('😥', 'Não encontrei nada, tente novamente.')
                                botChannel.send({ embeds: [embed] }).then(()=>{
                                    message.delete();
                                }).catch((err)=>{
                                    throw err;
                                }); 
                            } else {
                                for (let i in listaResultados){
                                    embed.addField(`${parseInt(i)+1}: ${listaResultados[i].tituloVideo}`, `[${listaResultados[i].descricao}](${listaResultados[i].link})`)
                                }
                                botChannel.send({ embeds: [embed] }).then(()=>{
                                    message.delete();
                                }).catch((err)=>{
                                    throw err;
                                }); 
    
                            }

                        } 
                    }

                }          
            
            });
        }
    }
}