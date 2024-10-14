const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
var cors = require('cors')

cors({ origin: 'http://localhost:3000' })


app.get('/api', function (req, res, next) {
    const url = 'https://trace.moe/api/search';
    axios.get(url)
    .then(response => {
        if (response && response.data) {
            res.json(response.data);
        } else {
            res.status(500).send('Failed to retrieve data');
        }
    })
    .catch(error => {
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
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

