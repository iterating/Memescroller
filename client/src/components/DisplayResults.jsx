import React, { useState } from "react";
import "../styles.css";
import { useDispatch } from "react-redux";
import { SaveNoteButton } from "./buttons";

const DisplayResults = ({ results = [] }) => {
  const dispatch = useDispatch();
  const [noteContent, setNoteContent] = useState("");

  if (results.length === 0) {
    return <div>No results found</div>;
  }

  // Handle adding note content
  const handleAddNote = (anime) => {
    const newContent = `${anime.filename} - Episode ${anime.episode}\n`;
    setNoteContent((prevContent) => prevContent + newContent);
    dispatch({ type: "ADD_NOTE_CONTENT", payload: newContent });
  };

  return (
    <div className="results">
      {results.map((anime) => (
        <div key={anime.filename} className="result">
          <h5>{anime.filename}</h5>
          <p>Episode: {anime.episode}</p>
          
          {anime.video ? (
            <video src={anime.video} controls />
          ) : (
            <div>No video available</div>
          )}
          <br />
          <button
            type="button"
            onClick={() => handleAddNote(anime)}
          >
            Add Title and Episode to Note
          </button>
          <br />
        </div>
      ))}
      <textarea
        value={noteContent}
        readOnly
        rows={5}
        style={{ width: "400px", marginTop: "20px" }}
      />
    </div>
  );
};

export default DisplayResults;

