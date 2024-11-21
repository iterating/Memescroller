import React, { useState } from "react";
import ImageDataFetcher from "./components/ImageDataFetcher";
import DisplayResults from "./components/DisplayResults";
import DisplayImage from "./components/DisplayImage";
import { PreviousButton, RandomButton, NextButton, AnalyzeButton, SaveNoteButton, ToggleSlider } from "./components/buttons";
import FetchNotes from "./components/FetchNotes";
import { connect } from "react-redux";
import "./styles.css";

const App = ({ sourceUrls, imageData }) => {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]); // Store search results

  const handleResults = (newResults) => {
    setResults(newResults);
  };

  return (
    <div>
      <ToggleSlider />
      <PreviousButton imageData={imageData} index={index} setIndex={setIndex} />
      <RandomButton imageData={imageData} setIndex={setIndex} />
      <NextButton imageData={imageData} index={index} setIndex={setIndex} />
      <AnalyzeButton imageData={imageData} index={index} setResults={handleResults} />
      <DisplayImage index={index} imageData={imageData} />
      <ImageDataFetcher sourceUrls={sourceUrls} />
      
      {results.length > 0 && <DisplayResults results={results} />}
      <SaveNoteButton />
      <FetchNotes />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sourceUrls: state.sourceUrls,
  imageData: state.imageData,
});

export default connect(mapStateToProps)(App);  