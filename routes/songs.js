const router = require("express").Router();
const axios = require("axios");

router.get("/api/songs/:id", (req, res) => {
  //   const queryURL = `http://api.musixmatch.com/ws/1.1/track.search?q=${req.body.id}&page_size=25&page=1&apikey=${process.env.MUSIC_KEY}`;
  console.log(req);
  const queryURL =
    "http://api.musixmatch.com/ws/1.1/track.search?q_artist=" +
    req.params.id +
    "&s_track_rating=desc&page_size=25&page=1&apikey=" +
    process.env.MUSIC_KEY;
  axios.get(queryURL).then(response => {
    res.send(response.data);
  });
});

module.exports = router;
