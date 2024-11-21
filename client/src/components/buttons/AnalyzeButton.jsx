import React, { useState } from "react";
import { searchAnime } from "../../utils/searchAnime";

const AnalyzeButton = ({ index, imageData, setResults }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!imageData || !imageData[index]) {
      console.error("Invalid image data or index.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const results = await searchAnime(imageData[index]);
      console.log("Anime Results:", results);
      
      // Pass the results back to the parent App component
      setResults(results);
    } catch (err) {
      console.error("Error fetching anime data:", err);
      setError("Failed to fetch anime data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button id="analyze-btn" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AnalyzeButton;
