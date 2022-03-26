const { MessageEmbed } = require("discord.js");
const mkSchema = require("../../models/mkSchema");

module.exports = {
  name: "score",
  aliases: ["puntaje", "core"],
  description: "Muestra la puntacion total",
  async execute(client, message, args, discord) {
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

    let t1 = warData.team1;
    let t2 = warData.team2;
    let nrace = warData.race - 1;
    let points = warData.points;
    let played = warData.played;

    // Si no jugaron la 1ra carrera
    if (nrace < 0) return message.channel.send(`Todavía no hay puntuación`);

    // Por si pasa las 12
    if (nrace > 11) nrace = 11;

    // Suma del puntaje total
    let t1Score = 0;
    let t2Score = 0;
    for (var i = 0; i < nrace + 1; i++) {
      if (nrace < 12) {
        t1Score += points[i][0];
        t2Score += points[i][1];
      }
    }

    // Tabla de puntos por carrera
    let first12 = "```";
    for (var i = 0; i < nrace + 1; i++) {
      if (i < 12) {
        if ((i + 1).toString().length < 2) first12 += ` `;
        first12 += `${i + 1}`;
        first12 += ` | ${points[i][0]} - ${points[i][1]} `;
        first12 += `(`;
        if (points[i][0] - points[i][1] > 0) first12 += `+`;
        first12 += `${points[i][0] - points[i][1]}) `;
        if (played[i]) first12 += `(${client.tracks.get(played[i]).acr})`;
        first12 += `\n`;
      }
    }
    first12 += "```";

    // Embed del puntaje
    let score = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Puntuación total (carrera ${nrace + 1})`)
      .addFields(
        {
          name: `${t1}`,
          value: `${t1Score}`,
          inline: true,
        },
        {
          name: `${t2}`,
          value: `${t2Score}`,
          inline: true,
        },
        {
          name: `Diferencia`,
          value: `${t1Score - t2Score}`,
        },
        {
          name: `Puntuación (primeras 12)`,
          value: `${first12}`,
        }
      );
    message.channel.send({ embeds: [score] });
  },
};
