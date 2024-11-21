import React, { useState } from "react";

const DisplayResults = ({ results = [] }) => {
  console.log("DisplayResults");

  // no results
  if (results.length === 0) {
    return <div>No results found</div>;
  }

  // Local state to manage the note content
  const [noteContent, setNoteContent] = useState("");

  // Handle adding note content
  const handleAddNote = (anime) => {
    setNoteContent((prevContent) => {
      return `${prevContent}\n${anime.filename} - Episode ${anime.episode}\n`;
    });
  };

  return (
    <div className="results">
      {results.map((anime) => (
        <div key={`${anime.filename}-${anime.episode}`} className="result">
          <h2>{anime.filename}</h2>
          <p>Episode: {anime.episode}</p>
          
          {anime.video ? (
            <video src={anime.video} controls />
          ) : (
            <div>No video available</div>
          )}
          
          <button
            type="button"
            onClick={() => handleAddNote(anime)}
          >
            Add Title and Episode to Note
          </button>
        </div>
      ))}

      <div className="note-container">
        <label htmlFor="note-content">Notes:</label>
        <textarea
          id="note-content"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          rows={5}
          cols={40}
          placeholder="Add your notes here..."
        />
        <button
          type="button"
          onClick={() => setNoteContent("")}
        >
          Clear Notes
        </button>
      </div>
    </div>
  );
};

export default DisplayResults;
