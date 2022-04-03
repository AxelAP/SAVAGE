const fs = require("fs");
const { trackAcr, trackES, trackEN, trackImg } = require("../data.json");

module.exports = (client, discord) => {
  const tracks = fs
    .readdirSync(`./img/`)
    .filter((file) => file.endsWith(".png"));

  for (let file of tracks) {
    if (file) {
      file = file.slice(0, -4);
      file = file.toLowerCase();
      client.tracks.set(file, {
        acr: trackAcr[file],
        es: trackES[file],
        en: trackEN[file],
        img: trackImg[file],
      });
    } else {
      console.log(`Error: ${file}`);
    }
  }
  console.log("Pistas cargadas");
};
