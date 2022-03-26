const mkSchema = require("../../models/mkSchema");

module.exports = {
  name: "revertscore",
  aliases: ["revert", "revertir", "return", "retornar", "volver"],
  description: "Revierte a un score anterior",
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

    if (!args[0]) return message.channel.send(`Introduce a que carrera volver`);
    if (isNaN(args[0]))
      return message.channel.send("Introduce a que carrera volver");
    if (args[0] < 1 || args[0] > 12)
      return message.channel.send(`Esa carrera no es valida`);

    // Datos de la db
    let warData = await mkSchema.findOne({
      serverID: message.guild.id,
    });

    let nrace = warData.race - 1;
    if (nrace < args[0] - 1)
      return message.channel.send(`Esa carrera no es valida`);

    await mkSchema.updateOne(
      {
        serverID: message.guild.id,
      },
      {
        race: args[0],
      }
    );
    message.channel.send(`La puntuación se revirtió`);
  },
};
