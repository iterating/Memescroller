const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 9000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.get("/api/search", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("No URL provided");
  }
  try {
    const response = await axios.get(
      `https://api.trace.moe/search?url=${encodeURIComponent(url)}`
    );
    const resData = response.data;

    if (!resData || !resData.result || resData.result.length === 0) {
      return res.status(404).send("No data found");
    }
    const anime = resData.result;
    // Send response back to client
    res.status(200).json(anime);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to retrieve data");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
