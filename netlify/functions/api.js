import express, { Router } from "express";
import serverless from "serverless-http";
import axios from "axios";

const api = express();
const router = Router();

const pastebinAPI = process.env.PASTEBIN_API_KEY || "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";

router.get("/notes", async (req, res) => {
  try {
    const userKey = req.query.api_user_key;
    if (!userKey) {
      console.error("Error: Missing user key");
      return res.status(400).send({ error: "Missing user key" });
    }

    const response = await axios.get("https://pastebin.com/api/api_post.php", {
      params: {
        api_dev_key: pastebinAPI,
        api_user_key: userKey
      }
    });

    const notes = [];
    if (response.data) {
      response.data.forEach(note => {
        const noteTitle = note.title;
        notes.push({ url: note.key, title: noteTitle });
      });
    }
    res.send(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    res.status(500).send({ error: "Error fetching notes: " + error.message });
  }
});

router.post("/notes", async (req, res) => {
  try {
    const { api_paste_name, api_paste_code } = req.body;
    if (!api_paste_name || !api_paste_code) {
      console.error("Error: Missing note title or content");
      return res.status(400).send({ error: "Missing note title or content" });
    }

    const data = new URLSearchParams();
    data.append("api_dev_key", pastebinAPI);
    data.append("api_option", "paste");
    data.append("api_paste_code", api_paste_code);
    data.append("api_paste_name", api_paste_name);
    data.append("api_paste_private", "1"); // 0=public, 1=unlisted, 2=private

    const response = await axios.post(
      "https://pastebin.com/api/api_post.php",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    if (response && response.data) {
      res.send({ url: response.data });
    } else {
      throw new Error("No response data");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Error saving note: " + error.message });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const userKey = req.query.api_user_key;
    if (!userKey) {
      console.error("Error: Missing user key");
      return res.status(400).send({ error: "Missing user key" });
    }

    const response = await axios.post("https://pastebin.com/api/api_list.php", {
      params: {
        api_dev_key: pastebinAPI,
        api_user_key: userKey
      }
    });

    const notes = [];
    if (response.data) {
      response.data.forEach(note => {
        const noteTitle = note.title;
        notes.push({ url: note.key, title: noteTitle });
      });
    }
    res.send(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    res.status(500).send({ error: "Error fetching notes: " + error.message });
  }
});

api.use("/api/", router);

export const handler = serverless(api);
