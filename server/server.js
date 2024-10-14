const express = require('express');
const app = express();
const port = 9000;
const axios = require('axios');
var cors = require('cors')

cors({ origin: 'http://localhost:9000' })


app.get('/api', function (req, res, next) {
    axios.get('http://localhost:9000/api/search')
    .then(response => console.log(response.data))
    .catch(error => {
      console.error(error);
      console.log('Request headers:', error.config.headers);
      console.log('Request data:', error.config.data);
    });
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        res.status(500).send('Failed to retrieve data');
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

