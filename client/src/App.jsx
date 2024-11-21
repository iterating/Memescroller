import React, { useState } from "react";
import ImageDataFetcher from "./components/ImageDataFetcher";
import DisplayResults from "./components/DisplayResults";
import DisplayImage from "./components/DisplayImage";
import { PreviousButton, RandomButton, NextButton, AnalyzeButton, SaveNoteButton, ToggleSlider } from "./components/buttons";
import FetchNotes from "./components/FetchNotes";
import { useDispatch, connect, useSelector } from "react-redux";
import "./styles.css";

const App = ({ sourceUrls, imageData }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <ToggleSlider />
      <PreviousButton imageData={imageData} index={index} setIndex={setIndex} />
      <RandomButton imageData={imageData} setIndex={setIndex} />
      <NextButton imageData={imageData} index={index} setIndex={setIndex} />
      <AnalyzeButton imageData={imageData} index={index} />
      <ImageDataFetcher />
      {imageData && imageData.length > 0 ? (
        <>
          <DisplayImage index={index} imageData={imageData} />
        </>
      ) : (
        <div>No image URL available</div>
      )}
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

