const { MessageEmbed } = require("discord.js");
const mkSchema = require("../../models/mkSchema");

module.exports = {
  name: "played",
  aliases: ["tracklist", "lista", "trackplayed"],
  description: "Enseña las pistas jugadas",
  async execute(client, message, args, discord) {
    // Si se uso s.war
    try {
      let warData = await mkSchema.findOne({
        serverID: message.guild.id,
      });
      if (!warData) {
        return message.channel.send("Debes iniciar la war con `s.war`");
      }
    } catch (error) {
      console.log(error);
    }

    // Datos de la db
    let warData = await mkSchema.findOne({
      serverID: message.guild.id,
    });

    let nrace = warData.race - 1;
    let played = warData.played;

    // Por si pasa las 12
    if (nrace >= 12) nrace = 11;

    let first12 = "```";
    for (var i = 0; i < nrace + 1; i++) {
      if ((i + 1).toString().length < 2) first12 += ` `;
      first12 += `${i + 1}`;
      first12 += ` | `;
      if (played[i] !== "") first12 += `${client.tracks.get(played[i]).es}`;
      if (played[i] === "") first12 += ``;
      first12 += `\n`;
    }
    first12 += "```";

    let tracks = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Pistas jugadas (carrera ${nrace + 1})`)
      .setDescription(first12);
    message.channel.send({ embeds: [tracks] });
  },
};
