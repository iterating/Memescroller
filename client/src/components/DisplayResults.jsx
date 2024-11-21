import React, { useEffect, useState, useRef } from "react";

const DisplayResults = ({ results = [] }) => {
  console.log("DisplayResults");
  if (results.length === 0) {
    return null;
  }
  return (
    <div className="results">
      {results.map((anime) => (
        <div key={anime.id} className="result">
          <h2>{anime.filename}</h2>
          <p>Episode: {anime.episode}</p>
          {anime.video && (
            <video src={anime.video} controls />
          )}
          <button
            type="button"
            onClick={() => {
              const noteContent = document.getElementById("note-content");
              if (noteContent) {
                noteContent.value += `\n${anime.filename} - Episode ${anime.episode}\n`;
              }
            }}
          >
            Add Title and Episode to Note
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayResults;
