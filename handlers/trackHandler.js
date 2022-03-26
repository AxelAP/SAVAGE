const fs = require("fs");
const { trackAcr, trackES, trackEN, trackImg } = require("../data.json");

module.exports = (client, discord) => {
  const tracks = fs
    .readdirSync(`./img/`)
    .filter((file) => file.endsWith(".png"));

  for (const file of tracks) {
    if (file) {
      client.tracks.set(file.slice(0, -4).toLowerCase(), {
        acr: trackAcr[file.slice(0, -4).toLowerCase()],
        es: trackES[file.slice(0, -4).toLowerCase()],
        en: trackEN[file.slice(0, -4).toLowerCase()],
        img: trackImg[file.slice(0, -4).toLowerCase()],
      });
    } else {
      console.log(`Error: ${file}`);
    }
  }
  console.log("Pistas cargadas");
};
