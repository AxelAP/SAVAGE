const { MessageEmbed } = require("discord.js");

module.exports = async (client, discord, interaction) => {
  if (interaction.isButton()) {
    const message = interaction.message;
    const creator = client.users.cache.get(`255405439095668747`);

    if (interaction.customId === "help_prev") {
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
      interaction.deferUpdate();
      return message.edit({ embeds: [help1] });
    }
    if (interaction.customId === "help_next") {
      let help2 = new MessageEmbed()
        .setColor("PURPLE")
        .setTitle(`Comandos de ${client.user.username}`)
        .setThumbnail(client.user.avatarURL())
        .setFooter({
          text: `Creador: ${creator.tag}`,
          iconURL: creator.avatarURL(),
        })
        .addFields(
          {
            name: `checkrace`,
            value: `Simula un puntaje`,
          },
          {
            name: `revert`,
            value: `Revierte a un score anterior`,
          },
          {
            name: `track`,
            value: `Devuelve una pista`,
          },
          {
            name: `random`,
            value: `Revela una pista aleatoria`,
          }
        );
      interaction.deferUpdate();
      return message.edit({ embeds: [help2] });
    }
    if (interaction.customId === "help_del") {
      return message.delete();
    }
  }
};
