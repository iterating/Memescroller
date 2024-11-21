import React from "react"

const PreviousButton = ({ index, imageData, setIndex }) => {
  const handlePrevious = () => {
    setIndex((index - 1 + imageData.length) % imageData.length)
  }
  return (
    <button id="prev-img" onClick={handlePrevious}>
      ⇐ Prev
    </button>
  )
}

export default PreviousButton
