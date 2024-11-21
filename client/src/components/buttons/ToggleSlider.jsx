import React from "react";
import { useDispatch } from "react-redux";

const ToggleSlider = () => {
  const dispatch = useDispatch();

  const handleToggleSlider = (e) => {
    console.log("ToggleSlider handleToggleSlider");
    if (e.target.checked) {
      dispatch({
        type: "SET_SOURCE_URLS",
        payload: [
          "https://www.reddit.com/r/animemes.json?limit=200",
          "https://www.reddit.com/r/goodanimemes.json?limit=600",
          "https://www.reddit.com/r/wholesomeanimemes.json?limit=600",
        ],
      });
    } else {
      dispatch({
        type: "SET_SOURCE_URLS",
        payload: [
          "https://www.reddit.com/r/animescreenshots.json?limit=700",
          "https://www.reddit.com/r/animescenery.json?limit=700",
        ],
      });
    }
  };

  return (
    <div>
      <input type="checkbox" id="toggle-slider" onChange={handleToggleSlider} />
      <label htmlFor="toggle-slider">Anime</label>
      <span> </span>
      <label htmlFor="toggle-slider">Memes</label>
    </div>
  );
};

export default ToggleSlider;
