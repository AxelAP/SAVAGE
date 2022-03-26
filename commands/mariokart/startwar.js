const mkSchema = require("../../models/mkSchema");

module.exports = {
  name: "startwar",
  aliases: ["start", "inicio", "war"],
  description: "Inicia una war",
  async execute(client, message, args, discord) {
    if (!args[0] || !args[1])
      return message.channel.send("Introduce 2 nombres para los equipos");

    try {
      let warData = await mkSchema.findOne({
        serverID: message.guild.id,
      });
      if (!warData) {
        let war = await mkSchema.create({
          serverID: message.guild.id,
          team1: args[0],
          team2: args[1],
          race: 0,
          logs: [
            {
              serverID: message.guild.id,
            },
          ],
        });
        war.save();
      } else {
        await mkSchema.updateOne(
          {
            serverID: message.guild.id,
          },
          {
            team1: args[0],
            team2: args[1],
            race: 0,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Se ha iniciado una war en: " + message.guild.name);
    message.channel.send(
      "War iniciada entre `" + args[0] + "` vs `" + args[1] + "`"
    );
  },
};
