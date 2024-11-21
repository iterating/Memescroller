import React, { useState, useEffect, useRef } from "react"
import ImageDataFetcher from "./components/ImageDataFetcher"
import DisplayResults from "./components/DisplayResults"
import DisplayImage from "./components/DisplayImage"
import {
  PreviousButton,
  RandomButton,
  NextButton,
  AnalyzeButton,
  SaveNoteButton,
  ToggleSlider,
} from "./components/buttons"
import FetchNotes from "./components/FetchNotes"
import { connect } from "react-redux"
import Hammer from "hammerjs"
import "./styles.css"

const App = ({ sourceUrls, imageData }) => {
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState([])
  const [notes, setNotes] = useState([])

  // Create a reference to the document body for Hammer.js
  const containerRef = useRef(document.body)
  
  const handleResults = (newResults) => {
    setResults(newResults)
  }

  useEffect(() => {
    const handleSwipe = (direction) => {
      setIndex(
        (prevIndex) =>
          (prevIndex + (direction === "left" ? 1 : -1) + imageData.length) %
          imageData.length
      )
    }

    const hammer = new Hammer(containerRef.current)
    hammer.on("swipeleft swiperight", (event) => {
      handleSwipe(event.type)
    })

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          handleSwipe("left")
          break
        case "ArrowRight":
          handleSwipe("right")
          break
        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      hammer.destroy()
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [imageData, index])

  return (
    <div ref={containerRef}>
      <ToggleSlider />
      <PreviousButton imageData={imageData} index={index} setIndex={setIndex} />
      <RandomButton imageData={imageData} setIndex={setIndex} />
      <NextButton imageData={imageData} index={index} setIndex={setIndex} />
      <AnalyzeButton
        imageData={imageData}
        index={index}
        setResults={handleResults}
      />
      <DisplayImage index={index} imageData={imageData} />
      <ImageDataFetcher sourceUrls={sourceUrls} />

      {results.length > 0 && <DisplayResults results={results} />}
      <SaveNoteButton />
      <FetchNotes />
    </div>
  )
}

const mapStateToProps = (state) => ({
  sourceUrls: state.sourceUrls,
  imageData: state.imageData,
})

export default connect(mapStateToProps)(App)

