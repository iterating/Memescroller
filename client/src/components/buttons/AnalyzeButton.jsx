import React from "react";
import { searchAnime } from "../utils/searchAnime";

const AnalyzeButton = ({ index, imageData }) => {
  const handleAnalyze = async () => {
    if (imageData[index]) {
      const results = await searchAnime(imageData[index]);
      console.log("Anime Results:", results);
    }
  };

  return (
    <button id="analyze-btn" onClick={handleAnalyze}>
      Analyze
    </button>
  );
};

export default AnalyzeButton;
