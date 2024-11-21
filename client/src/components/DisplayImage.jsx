import React from "react";
import { useSelector } from "react-redux";

const DisplayImage = ({ index, imageData }) => {
  // Check if the index is within the bounds of imageData
  const imageUrl = imageData && imageData[index];

  console.log(`DisplayImage imageUrl: ${imageUrl}`);

  if (!imageUrl) {
    console.log("DisplayImage imageUrl is null");
    return <div>No image available</div>; 
  }

  return (
    <div>
      <img
        src={imageUrl}

        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
        }}
        // Lazy load the image
        loading="lazy" 
      />
    </div>
  );
};

export default DisplayImage;
