const axios = require("axios");
export default {
  getSongs: function (req, res) {
    const input = req;
    return axios.get("/api/searchresults/" + input);
  },
  getSongFromURL: function (req, res) {
    console.log(req);
    return axios.get("/api/result/" + req);
  },
  getVideo: function (currentSong) {
    return axios.get(
      "/api/song/" + currentSong.title + "-" + currentSong.artist
    );
  },

  getLyrics: function (currentSong) {
    return axios.get(
      "/api/lyrics/" + currentSong.title + " " + currentSong.artist
    );
  },

  getImage: function (currentSong) {
    return axios.get(
      "/api/image/" + currentSong.title.replace(/\//g, "") + "-" + currentSong.artist.replace(/\//g, "")
    );
  },
  createUser: function (req) {
    return axios.post("/api/signup", req);
  },
  getUser: function (req) {
    return axios.post("/api/login", req);
  },
  saveSong: function (req) {
    return axios.post("/api/saved", req);
  },
  getSaved: function (req) {
    return axios.get("/api/saved", req);
  },
  findSaved: function (req) {
    return axios.get("/api/savedsongs/" + req);
  },
  deleteSavedSong: function (currentSong) {
    return axios.delete("/api/savedsongs/" + currentSong);
  },
  getSongsByArtist: function (currentSong) {
    return axios.get("/api/songs/" + currentSong);
  }
};
