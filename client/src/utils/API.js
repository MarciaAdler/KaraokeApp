const axios = require("axios");
export default {
  getSongs: function(req, res) {
    console.log(req);
    const input = req;
    return axios.get("/api/searchresults/" + input);
  },

  getVideo: function(currentSong) {
    return axios.get(
      "/api/song/" + currentSong.title + "-" + currentSong.artist
    );
  },

  getLyrics: function(currentSong) {
    return axios.get(
      "/api/lyrics/" + currentSong.title + "-" + currentSong.artist
    );
  },

  getImage: function(currentSong) {
    return axios.get(
      "/api/image/" + currentSong.title + "-" + currentSong.artist
    );
  },
  createUser: function(req) {
    return axios.post("/api/signup", req);
  }
};
