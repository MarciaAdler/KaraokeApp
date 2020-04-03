const router = require("express").Router();
const axios = require("axios");

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

router.get("/api/video/:id", (req, res) => {
  const queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbqcG1rdt9LMwOJN4PyGTKg&maxResults=1&q=${req.params.id}&type=video&key=${process.env.YOUTUBE_KEY}`

  res.send(queryURL);

});

module.exports = router;
