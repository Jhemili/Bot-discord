const Config = require('config');

module.exports = {
    name: 'newmember',
    description: 'Adding a new member to the guild',
    async execute(client, member, adminDm, Discord) {
        const novoUser = member.id;
        const avatar = member.displayAvatarURL({ dynamic: true });

        const novoMembroEmbed = new Discord.MessageEmbed()
        .setColor([153, 0, 76])
        .setTitle('NOVO MEMBRO ADICIONADO')
        .setThumbnail(`${avatar}`)
        .setDescription(`<@!${novoUser}> foi adicionado`)
        .addFields({
          name: 'Selecione uma opção:',
          value:
            'OPTION 1 1️⃣ \n OPTION 2 2️⃣ \n OPTION 3 ❌',
        });
  
        try {
          const sentDM = await adminDm.send({ embeds: [novoMembroEmbed] });
          const filter = (reaction, user) =>
            ['❌', '1️⃣','2️⃣'].includes(reaction.emoji.name) && user.id === adminDm.id;
            
          sentDM.react('1️⃣');
          sentDM.react('2️⃣');
          sentDM.react('❌');
    
          // add a single options object only
          const collected = await sentDM.awaitReactions({ filter, maxEmojis: 1 });
          
          if (collected.first().emoji.name === '1️⃣') {
            //DO SOME STUFF
            
          } if (collected.first().emoji.name === '2️⃣'){
            //DO SOME STUFF
          }        
          else {
            return;
          }
      } catch (err) {
        console.log(err);
      }
    },
};