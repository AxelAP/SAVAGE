const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "track",
  aliases: ["pista"],
  description: "Devuelve una pista",
  async execute(client, message, args, discord) {
    if (!args[0]) return message.channel.send("Introduce una pista");
    const track = client.tracks.get(args[0].toLowerCase());

    if (track) {
      let truck = new MessageEmbed()
        .setColor("PURPLE")
        .setThumbnail(track.img)
        .setTitle(track.acr)
        .setDescription(`${track.es}\n${track.en}`);
      message.channel.send({ embeds: [truck] });
    }

    if (!track)
      return message.channel.send({
        content: "Introduce una pista valida",
        files: [
          "https://media.discordapp.net/attachments/509868451888627722/986122893312294922/All_Tracks.jpg",
          "https://media.discordapp.net/attachments/509868451888627722/986122954410721342/All_Battle_Tracks.jpg?width=1440&height=552",
        ],
      });
  },
};
