const axios = require("axios");
export default {
  getSongs: function(req, res) {
    console.log(req);
    const input = req;
    return axios.get("/api/results/" + input);
  }
};
