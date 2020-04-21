const router = require("express").Router();
const axios = require("axios");
const resultsController = require("../controllers/resultsController");

router.get("/api/lyrics/:id", (req, res) => {
  const queryURL =
    "http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" +
    req.params.id +
    "&s_track_rating=desc&page_size=25&page=1&apikey=" +
    process.env.MUSIC_KEY;
  axios.get(queryURL).then((response) => {
    const id = response.data.message.body.track_list[0].track.track_id;
    const queryURL2 =
      "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" +
      id +
      "&apikey=" +
      process.env.MUSIC_KEY;
    axios.get(queryURL2).then((lyrics) => {
      res.send(lyrics.data.message.body.lyrics.lyrics_body);
    });
  });
});

router.get("/api/song/:title", (req, res) => {
  const queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${req.params.title}-karaoke&type=video&key=${process.env.YOUTUBE_KEY}&videoEmbeddable=true`;
  axios.get(queryURL).then((response) => {
    res.send(response.data);
  });
});

router.route("/api/songs/:artist").get(resultsController.findAllByArtist);

router.route("/api/searchresults/:title").get(resultsController.findAll);

router.route("/api/result/:query").get(resultsController.findOne);

module.exports = router;
