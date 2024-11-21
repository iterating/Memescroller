import React from "react";


const RandomButton = ({ imageData, setIndex }) => {
  const handleRandom = () => {
    setIndex(Math.floor(Math.random() * imageData.length))
  }

  return (
    <button id="random" onClick={handleRandom}>
      ⇑ Random
    </button>
  )
}
export default RandomButton
