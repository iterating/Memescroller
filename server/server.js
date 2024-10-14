const express = require('express');
const app = express();
const port = 9000;
const axios = require('axios');
var cors = require('cors')

//this is the express.js backend that sends rquests to trace.moe api as to avoid CORS errors

app.use(cors({ origin: 'http://localhost:9000' }));

app.get('/api/search', function (req, res) {
    const url = req.query.url;
    axios.get(`https://trace.moe/api/${url}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Failed to retrieve data');
    });
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});