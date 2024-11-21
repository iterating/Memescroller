import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const pastebinKey = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";
let pastebinUrl = "https://pastebin.com/GBpZZrMm";

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Received GET request");
  console.log(`Request URL: ${req.url}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  res.send("Memescroll Server is Up");
});

app.post("/notes", async (req, res) => {
  try {
    console.log("Received POST request");
    console.log(`Request URL: ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);

    const response = await axios.post(
      "https://pastebin.com/api/api_post.php",
      new URLSearchParams({
        api_dev_key: pastebinKey,
        api_option: "paste",
        api_paste_code: req.body.content,
        api_paste_name: req.body.title,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Response from Pastebin:");
    console.log(response.data);

    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return res.status(500).send({ error: "Missing response data" });
    }

    pastebinUrl = response.data;
    res.send({ url: pastebinUrl });
  } catch (error) {
    console.error("Failed to save note:", error);
    return res.status(500).send({ error: "Failed to save note" });
  }
});

app.get("/favorites", async (req, res) => {
  try {
    console.log("Received GET request");
    console.log(`Request URL: ${req.url}`);

    const response = await axios.post(
      `${pastebinUrl}`,
      new URLSearchParams({
        api_dev_key: pastebinKey,
        api_option: "show_paste",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Response from Pastebin:");
    console.log(response.data);

    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return res.status(500).send({ error: "Missing response data" });
    }

    const notes = response.data.map(note => ({
      url: note.key,
      title: note.title
    }));

    res.send(notes);
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
  console.log(`-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}`);
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(JSON.stringify(req.body));
  }
  next();
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: err });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

export default app;

