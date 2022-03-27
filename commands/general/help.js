const { MessageEmbed, MessageButton } = require("discord.js");

module.exports = {
  name: "help",
  aliases: [`ayuda`],
  description: "Lista de comandos del bot",
  async execute(client, message, args, discord) {
    const creator = client.users.cache.get(`255405439095668747`);

    let help1 = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Comandos de ${client.user.username}`)
      .setThumbnail(client.user.avatarURL())
      .setFooter({
        text: `Creador: ${creator.tag}`,
        iconURL: creator.avatarURL(),
      })
      .addFields(
        {
          name: `war`,
          value: `Inicia una war`,
        },
        {
          name: `race`,
          value: `Añade una carrera`,
        },
        {
          name: `score`,
          value: `Muestra la puntacion total`,
        },
        {
          name: `played`,
          value: `Enseña las pistas jugadas`,
        }
      );

    const btn1 = new MessageButton()
      .setCustomId("help_prev")
      .setLabel("Atrás")
      .setStyle("PRIMARY");
    const btn2 = new MessageButton()
      .setCustomId("help_next")
      .setLabel("Siguiente")
      .setStyle("PRIMARY");
    const btn3 = new MessageButton()
      .setCustomId("help_del")
      .setLabel("Borrar")
      .setStyle("DANGER");

    const hRow = new discord.MessageActionRow().addComponents(btn1, btn2, btn3);
    message.channel.send({ embeds: [help1], components: [hRow] });
  },
};
