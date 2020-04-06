const router = require("express").Router();
const axios = require("axios");
const resultsController = require("../controllers/resultsController");

// router.get("/api/songs/:id", (req, res) => {
//   console.log(req);
//   const queryURL =
//     "http://api.musixmatch.com/ws/1.1/track.search?q_artist=" +
//     req.params.id +
//     "&s_track_rating=desc&page_size=25&page=1&apikey=" +
//     process.env.MUSIC_KEY;
//   axios.get(queryURL).then(response => {
//     res.send(response.data);
//   });
// });

router.get("/api/song/:title", (req, res) => {
  const queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${req.params.title}-karaoke&type=video&key=${process.env.YOUTUBE_KEY}`;
  axios.get(queryURL).then(response => {
    res.send(response.data);
  });
});

router.route("/api/searchresults/:title").get(resultsController.findAll);

module.exports = router;
