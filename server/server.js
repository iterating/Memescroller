const express = require('express');
const app = express();
const port = 9000;
const axios = require('axios');
var cors = require('cors')

//this is the express.js backend that sends rquests to trace.moe api as to avoid CORS errors

app.use(cors({ origin: 'http://localhost:9000' }));

app.get('/api/search', function (req, res) {
    const url = req.query.url;
    if (!url) {
      res.status(400).send('No URL provided');
      return;
    }

    axios.get(`https://trace.moe/api/${url}`)
    .then(response => {
      const resData = response.data;
      if (!resData || !resData.data || !resData.data.result || resData.data.result.length === 0) {
        res.status(404).send('No data found');
        return;
      }

      const anime = resData.data.result[0];
      const title = anime.anilist ? anime.anilist.title.romaji : "";
      const episodes = anime.episode || "";
      const time = anime.at || "";
      const similarity = anime.similarity || "";
      const video = anime.video || "";
      const thumbnail = anime.image || "";
      
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result");
      resultDiv.innerHTML = `
        <h2>${title}</h2>
        <p>Episode: ${episodes}</p>
        <p>Time: ${time}</p>
        <p>Similarity: ${similarity}</p>
        <img src="${thumbnail}" />
        <video src="${video}" controls></video>
      `;
      imageDisplay.appendChild(resultDiv);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve data');
    });
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


