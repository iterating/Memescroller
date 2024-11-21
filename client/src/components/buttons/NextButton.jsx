import React from "react"

const NextButton = ({ imageData, index, setIndex }) => {
  const handleNext = () => {
    setIndex((index + 1) % imageData.length || 0)
  }
  return (
    <button id="next-img" onClick={handleNext}>
      Next ⇒
    </button>
  )
}
export default NextButton
