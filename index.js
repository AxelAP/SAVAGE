const discord = require("discord.js");
const client = new discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

require("dotenv").config();

const mongoose = require("mongoose");
const mg = process.env.DB;

mongoose
  .connect(mg, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

client.commands = new discord.Collection();
client.events = new discord.Collection();
client.tracks = new discord.Collection();

["commandHandler", "eventHandler", "trackHandler"].forEach((file) => {
  require(`./handlers/${file}`)(client, discord);
});

client.login(process.env.DSTOKEN);
