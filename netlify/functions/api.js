// import express, { Router } from "express";
// import serverless from "serverless-http";
// import axios from "axios";

// const app = express();
// const router = Router();

// app.use(express.json());

// router.post('/notes', async (req, res) => {
//   try {
//     const { api_paste_name, api_paste_code } = req.body;
//     if (!api_paste_name || !api_paste_code) {
//       console.error('Error: Missing note title or content');
//       return res.status(400).send({ error: 'Missing note title or content' });
//     }

//     const response = await axios.post('https://pastebin.com/api/api_post.php', {
//       'api_dev_key': process.env.PASTEBIN_API_KEY || 'l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK',
//       'api_option': 'paste',
//       'api_paste_code': api_paste_code,
//       'api_paste_name': api_paste_name,
//     });

//     if (!response || !response.data) {
//       console.error('Error: Missing response data');
//       return res.status(500).send({ error: 'Missing response data' });
//     }

//     res.send({ url: response.data });
//   } catch (error) {
//     console.error('Failed to save note:', error);
//     return res.status(500).send({ error: 'Failed to save note' });
//   }
// });

// router.get('/favorites', async (req, res) => {
//   try {
//     const response = await axios.post('https://pastebin.com/api/api_raw.php', {
//       api_dev_key: process.env.PASTEBIN_API_KEY || 'l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK',
//       api_user_key: userKey || '',
//       api_option: 'show_paste'
//     });

//     if (!response || !response.data) {
//       console.error('Error: Missing response data');
//       return res.status(500).send({ error: 'Missing response data' });
//     }

//     const notes = [];
//     response.data.forEach(note => {
//       const noteTitle = note.title;
//       notes.push({ url: note.key, title: noteTitle });
//     });

//     res.send(notes);
//   } catch (error) {
//     console.error('Failed to fetch notes:', error);
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//     }
//     return res.status(500).send({ error: 'Error fetching notes' });
//   }
// });

// export const handler = serverless(app);

