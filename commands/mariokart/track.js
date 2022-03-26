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

    if (!track) return message.channel.send("Introduce una pista valida");
  },
};
