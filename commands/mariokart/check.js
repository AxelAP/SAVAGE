const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "check",
  aliases: ["checkrace", "comprobar", "verificar"],
  description: "Simula un puntaje",
  async execute(client, message, args, discord) {
    // Si se pusieron todos las posiciones
    for (var i = 0; i < 6; i++) {
      if (!args[i]) return message.channel.send("Ingresa todas las posiciones");
      if (isNaN(args[i]))
        return message.channel.send("Ingresa todas las posiciones");
      if (args[i] < 1 || args[i] > 12)
        return message.channel.send("Esa posición no es valida");
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
    pts[1] = maxPts - pts[0];

    //Embed Race
    let race = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle(`Puntuación de la Carrera`)
      .addFields(
        {
          name: `Lugares`,
          value: `${plcs}`,
        },
        {
          name: `Puntaje`,
          value: `${pts[0]} - ${pts[1]}`,
        },
        {
          name: `Diferencia`,
          value: `${pts[0] - pts[1]}`,
        }
      );
    message.channel.send({ embeds: [race] });
  },
};
