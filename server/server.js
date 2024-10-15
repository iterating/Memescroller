const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const serverless = require('serverless-http');
// const port = process.env.PORT || 9000;
const pastebinKey = 'l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK'; 

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post('/notes', async (req, res) => {
  try {
    const { api_paste_name, api_paste_code } = req.body;
    if (!api_paste_name || !api_paste_code) {
      console.error('Error: Missing note title or content');
      return res.status(400).send({ error: 'Missing note title or content' });
    }
    const response = await axios.post('https://pastebin.com/api/api_post.php', {
      'api_dev_key': pastebinKey,
      'api_option': 'paste',
      'api_paste_code': api_paste_code,
      'api_paste_name': api_paste_name,
    });

    if (!response || !response.data) {
      console.error('Error: Missing response data');
      return res.status(500).send({ error: 'Missing response data' });
    }

    res.send({ url: response.data });
  } catch (error) {
    console.error('Failed to save note:', error);
    return res.status(500).send({ error: 'Failed to save note' });
  }
});

// Endpoint to fetch saved notes
app.get('/favorites', async (req, res) => {
  try {
    const userKey = req.query.userKey;
    if (!userKey) {
      console.error('Error: Missing user key');
      return res.status(400).send({ error: 'Missing user key' });
    }

    const response =   await axios.post(('https://pastebin.com/api/api_post.php'), {    
      api_dev_key: pastebinKey,
      api_user_key: userKey,
      api_option: 'list'
    });
    if (!response || !response.data) {
      console.error('Error: Missing response data');
      return res.status(500).send({ error: 'Missing response data' });
    }

    const notes = [];
    response.data.forEach(note => {
      const noteTitle = note.title;
      notes.push({url: note.key, title: noteTitle});
    });
    res.send(notes);
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    return res.status(500).send({ error: 'Error fetching notes' });
  }
});

// app.get("/api/search", async (req, res) => {
//   const url = req.query.url;
//   if (!url) {
//     return res.status(400).send({ error: "No URL provided" });
//   }
//   try {
//     const response = await axios.get(
//       `https://corsproxy.io/?https://api.trace.moe/search?url=${encodeURIComponent(url)}`
//     );
//     if (response === null || !response.data) {
//       return res.status(404).send({ error: "No data found" });
//     }
//     const anime = response.data.result;
//     // Send response back to client
//     res.json(anime);
//   } catch (error) {
//     console.error('Failed to retrieve data:', error);
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//     }
//     res.status(500).send({ error: "Failed to retrieve data" });
//   }
//});

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
app.listenmodule.exports.handler = serverless(app);
// app.listen(port, () => {
  // console.log(`Server running at http://localhost:${port}`);
// });


