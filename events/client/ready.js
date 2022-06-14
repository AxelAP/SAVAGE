const { Message } = require("discord.js");

require("dotenv").config();

module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: `${process.env.PREFIX}help` }],
    status: "Conectado",
  });
  console.log(`${client.user.username} esta en linea`);
};
