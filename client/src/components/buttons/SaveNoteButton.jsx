import React, { useState } from "react";
import axios from "axios";

const SaveNoteButton = () => {
  const apiUrl = 'http://localhost:3000';
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [savedNoteUrl, setSavedNoteUrl] = useState("");

  const handleSave = async () => {
    if (!noteTitle || !noteContent) {
      console.error("Error: Missing note title or content");
      return;
    }
    try {
      console.log("Sending POST request to save note");
      console.log("Note Title:", noteTitle);
      console.log("Note Content:", noteContent);

      const response = await axios.post(`${apiUrl}/notes`, {
        api_paste_name: noteTitle,
        api_paste_code: noteContent,
      });

      if (response.data?.url) {
        console.log("Response received:", response.data.url);
        setSavedNoteUrl(response.data.url);
      } else {
        console.error("Error: Missing response data");
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.setItem("lastNote", JSON.stringify({
        title: noteTitle,
        content: noteContent,
      }));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Note title"
        cols="80"
      /><br />
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Note content"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSave}>Save Note</button>
      {savedNoteUrl && (
        <p>
          Note saved: <a href={savedNoteUrl} target="_blank" rel="noopener noreferrer">{savedNoteUrl}</a>
        </p>
      )}
    </div>
  );
};

export default SaveNoteButton;
