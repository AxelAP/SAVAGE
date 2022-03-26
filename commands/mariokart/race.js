const { MessageEmbed } = require("discord.js");
const mkSchema = require("../../models/mkSchema");

module.exports = {
  name: "race",
  aliases: ["carrera"],
  description: "Añade una carrera",
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

    // Si se pusieron todos las posiciones
    for (var i = 0; i < 6; i++) {
      if (!args[i]) return message.channel.send("Ingresa todas las posiciones");
      if (isNaN(args[i]))
        return message.channel.send("Ingresa todas las posiciones");
      if (args[i] < 1 || args[i] > 12)
        return message.channel.send("Una posición no es valida");
    }

    // Si repitieron las posiciones
    for (var i = 0; i < 6; i++) {
      for (var n = 0; n < 6; n++) {
        if (i !== n) {
          if (args[i] === args[n])
            return message.channel.send("Ingrasa todas las posiciones");
        }
      }
    }

    // Datos de la db
    let warData = await mkSchema.findOne({
      serverID: message.guild.id,
    });

    let t1 = warData.team1;
    let t2 = warData.team2;
    let nrace = warData.race;
    let spots = warData.spots;
    let points = warData.points;
    let played = warData.played;

    // Obtener la pista
    let trck = " ";
    if (args[6]) trck = args[6];
    const track = client.tracks.get(trck.toLowerCase());
    if (track) {
      played[nrace] = args.pop();
    } else {
      played[nrace] = "";
    }

    // Puntos
    let pts = [];
    pts[0] = 0;
    pts[1] = 0;

    // Ordenar las posiciones
    args = args.sort(function (a, b) {
      return a - b;
    });

    // Añadir las posiciones nuevas
    let spts = [];
    for (var i = 0; i < 6; i++) {
      spts[i] = Math.trunc(args[i]);
    }

    // Datos utiles
    const maxPts = 82;
    // array[place, race]
    let pts_tbl = [15, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let plcs_tbl = [
      "1ro",
      "2do",
      "3ro",
      "4to",
      "5to",
      "6to",
      "7mo",
      "8vo",
      "9no",
      "10mo",
      "11mo",
      "12mo",
    ];

    // Lugares
    let plcs = plcs_tbl[spts[0] - 1];
    for (var i = 1; i < 6; i++) {
      plcs += `, ${plcs_tbl[spts[i] - 1]}`;
    }

    //Puntos Team1
    for (var i = 0; i < 6; i++) {
      pts[0] += parseInt(pts_tbl[spts[i] - 1]);
    }

    //Puntos Team2
    pts[1] = maxPts - pts[(nrace, 0)];

    // Actualizamos los multi array
    spots[nrace] = spts;
    points[nrace] = pts;

    //Embed Race
    let race = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Puntuación de la Carrera ${nrace + 1}`)
      .addFields(
        {
          name: `Lugares`,
          value: `${plcs}`,
        },
        {
          name: `${t1}`,
          value: `${pts[(nrace, 0)]}`,
          inline: true,
        },
        {
          name: `${t2}`,
          value: `${pts[(nrace, 1)]}`,
          inline: true,
        },
        {
          name: `Diferencia`,
          value: `${pts[(nrace, 0)] - pts[(nrace, 1)]}`,
        }
      );
    if (track) race.setThumbnail(track.img).addField(`Pista`, `${track.es}`);
    message.channel.send({ embeds: [race] });

    // Actualiza la Db
    await mkSchema.updateOne(
      {
        serverID: message.guild.id,
      },
      {
        race: nrace + 1,
        spots: spots,
        points: points,
        played: played,
      }
    );

    if (nrace > 0) {
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
    }
  },
};
