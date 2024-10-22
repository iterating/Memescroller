const express = require("express");
const cors = require("cors");
const axios = require("axios");
// const serverless = require("serverless-http");

const app = express();
const PORT = process.env.PORT || 3000;
const pastebinKey = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";
let pastebinUrl = "" || "https://pastebin.com/GBpZZrMm";

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  console.log("Received GET request");
  res.send("Memescroll Server is Up");
});

app.post("/notes", async (req, res) => {
  // console.log("Received  request to /notes");
  try {
    const response = await axios.post(
      "https://pastebin.com/api/api_post.php",
      new URLSearchParams({
        api_dev_key: pastebinKey,
        api_option: "paste",
        api_paste_code: req.query.content,
        api_paste_name: req.query.title,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return res.status(500).send({ error: "Missing response data" });
    }
    // console.log(response.data);
    pastebinUrl = response.data;
    res.send({ url: pastebinUrl });
  } catch (error) {
    console.error("Failed to save note:", error);
    return res.status(500).send({ error: "Failed to save note" });
  }
});

app.get("/favorites", async (req, res) => {
  // console.log("Received  request to /favorites");

  try {
    // const response = await axios.post(
    //   `${pastebinUrl}`
    //   // new URLSearchParams({
    //   //   api_dev_key: pastebinKey,
    //   //   api_option: "show_paste",
    //   // }),
    //   // {
    //   //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   // }
    // );
    // console.log("Received response from Pastebin API:", response.data);

    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return res.status(500).send({ error: "Missing response data" });
    }

    // const notes = [];
    // response.data.forEach((note) => {
    //   const noteTitle = note.title;
    //   notes.push({ url: note.key, title: noteTitle });
    // });

    res.send(response);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    }
    return res.status(500).send({ error: "Error fetching notes" });
  }
});
// Logging middleware
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(JSON.stringify(req.body));
    }
    next();
});
// app.use((err, req, res, next) => {
//   res.status(404).json({ error: err })
// })

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

// module.exports.handler = serverless(app);

module.exports = app;
