const router = require("express").Router();
const axios = require("axios");
const puppeteer = require("puppeteer");
const api = require("genius-api");
var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

//search
router.get("/api/lyrics/:title", (req, res) => {
  genius
    .search(req.params.title)
    .then(async function(response) {
      console.log("hits", response.hits);
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto(response.hits[0].result.url);
      const lyrics = await page.evaluate(
        () => document.querySelector(".lyrics").textContent
      );
      console.log(lyrics);

      await browser.close();
      return lyrics;
    })
    .catch(function(error) {
      console.error(error);
    });
});
module.exports = router;
