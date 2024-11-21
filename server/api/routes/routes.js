import axios from "axios"
import express from "express"
const router = express.Router()
import dotenv from "dotenv"
dotenv.config()
const pastebinKey = process.env.PASTEBINAPI
let pastebinUrl = "https://pastebin.com/GBpZZrMm"

router.get("/", (req, res) => {
  console.log("Received GET request")
  console.log(`Request URL: ${req.url}`)
  res.send("Memescroll Server is Up")
})

router.post("/notes", async (req, res) => {
  try {
    console.log("Received POST request");
    console.log(`Request URL: ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);

    const response = await axios.post(
      "https://pastebin.com/api/api_post.php",
      new URLSearchParams({
        api_dev_key: pastebinKey,
        api_option: "paste",
        api_paste_code: req.body.api_paste_code,
        api_paste_name: req.body.api_paste_name,
        api_paste_format: "text",
        api_paste_private: 0,
        api_paste_expire_date: "10M",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Response from Pastebin:");
    console.log(`Response status: ${response.status}`);
    console.log(`Response data: ${response.data}`);

    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return res.status(500).send({ error: "Missing response data" });
    }

    pastebinUrl = response.data;
    console.log(`Pastebin URL: ${pastebinUrl}`);
    res.send({ url: pastebinUrl });
  } catch (error) {
    console.error("Failed to save note:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    return res.status(500).send({ error: "Failed to save note" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    console.log("Received GET request")
    console.log(`Request URL: ${req.url}`)

    const response = await axios.get(`https://pastebin.com/api/api_raw.php?api_dev_key=${pastebinKey}&api_user_key=none&api_option=list&api_results_limit=1`)

    console.log("Response from Pastebin:")
    console.log(response.data)

    if (!response || !response.data) {
      console.error("Error: Missing response data")
      return res.status(500).send({ error: "Missing response data" })
    }

    const lastPaste = response.data.split("\n")[0]

    res.send({url: `https://pastebin.com/${lastPaste}`, title: lastPaste})
  } catch (error) {
    console.error("Failed to fetch notes:", error)
    if (error.response) {
      console.error("Error response:", error.response.data)
    }
    return res.status(500).send({ error: "Error fetching notes" })
  }
})

export default router
