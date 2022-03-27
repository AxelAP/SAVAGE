const { MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "random",
  aliases: ["randomtrack", "aleatoria"],
  description: "Revela una pista aleatoria",
  async execute(client, message, args, discord) {
    const tracks = fs
      .readdirSync(`./img/`)
      .filter((file) => file.endsWith(".png"));

    const random = Math.floor(Math.random() * client.tracks.size);
    const str = tracks[random].slice(0, -4);
    const track = client.tracks.get(str.toLowerCase());

    if (track) {
      let truck = new MessageEmbed()
        .setColor("PURPLE")
        .setThumbnail(track.img)
        .setTitle(track.acr)
        .setDescription(`${track.es}\n${track.en}`);
      message.channel.send({ embeds: [truck] });
    }
  },
};
