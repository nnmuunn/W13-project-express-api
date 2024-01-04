import express from "express";
import cors from "cors";
import momaArtists from "./momaArtists.json"

console.log(momaArtists.length);

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')

// Add middlewares to enable cors 
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

// show all artists
app.get("/artists", (req, res) => {
  res.json(momaArtists)
});

// show one artist
app.get("/artists/:artistId", (req, res) => {
  const artistId = req.params.artistId
  const artist = momaArtists.find((artist) => artist.ConstituentID === +artistId)
  // console.log("artisId:", artistId, typeof artistId); --> show what data type it is
  if (artist) {
    res.json(artist)
  } else {
    res.status(404).send("no artist boooo")
  }
})

// show nationality filtering the nationality
app.get("/gender/:gender", (req, res) => {
  const genderFm = req.params.gender
  const showNationality = req.query.nationality
  let genderMf = momaArtists.filter((gender) => gender.Gender === genderFm) 

  if (showNationality) {
    genderMf = genderMf.filter((person) => person.nationality)
  }

  res.json(genderMf)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
