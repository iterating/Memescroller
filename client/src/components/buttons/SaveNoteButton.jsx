import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const SaveNoteButton = () => {
    const apiUrl = 'http://localhost:3000';

    
    console.log("SaveNoteButton");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [savedNoteUrl, setSavedNoteUrl] = useState("");
  
    const handleSave = async () => {
      console.log("SaveNoteButton handleSave");
      if (!noteTitle || !noteContent) {
        console.error("Error: Missing note title or content");
        return;
      }
      try {
        const response = await axios.post(`${apiUrl}/notes`, {
          api_paste_name: noteTitle,
          api_paste_code: noteContent,
        });
        if (!response || !response.data) {
          console.error("Error: Missing response data");
          return;
        }
        setSavedNoteUrl(response.data.url);
      } catch (error) {
        console.error("Error:", error);
        localStorage.setItem("lastNote", JSON.stringify({
          title: noteTitle,
          content: noteContent,
        }));
      }
    };
  
    return (
      <>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note title"
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Note content"
        />
        <button onClick={handleSave}>Save Note</button>
        {savedNoteUrl && (
          <p>
            Note saved: <a href={savedNoteUrl} target="_blank" rel="noopener noreferrer">{savedNoteUrl}</a>
          </p>
        )}
      </>
    );
  };

  export default SaveNoteButton