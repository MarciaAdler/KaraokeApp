const router = require("express").Router();
const axios = require("axios");
const puppeteer = require("puppeteer");
const api = require("genius-api");
var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

//search
// router.get("/api/lyrics/:title", (req, res) => {
//   genius
//     .search(req.params.title)
//     .then(async function(response) {
//       // console.log("hits", response.hits);
//       const browser = await puppeteer.launch();

//       const page = await browser.newPage();
//       await page.goto(response.hits[0].result.url);
//       const lyrics = await page.evaluate(
//         () => document.querySelector(".lyrics").innerText
//       );
//       await browser.close();
//       res.send(lyrics);
//     })
//     .catch(function(error) {});
// });
router.get("/api/image/:title", (req, res) => {

  genius.search(req.params.title).then((response) => {
    res.send(response.hits[0].result);
  });
});
module.exports = router;
