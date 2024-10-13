const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.get('/api/search', (req, res) => {
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
        console.log(error);
        res.status(500).send('Failed to retrieve data');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
