import React from "react";
import { useDispatch } from "react-redux";
import * as api from "../../config/api";

const ToggleSlider = () => {
  const dispatch = useDispatch();

  const handleToggleSlider = (e) => {
    console.log("ToggleSlider handleToggleSlider");
    if (e.target.checked) {
      dispatch({
        type: "SET_SOURCE_URLS",
        payload: api.apiSources.animeMemeUrls,
      });
    } else {
      dispatch({
        type: "SET_SOURCE_URLS",
        payload: api.apiSources.animeSceneUrls
      });
    }
  };

  return (
    <div>
      <label htmlFor="toggle-slider">Anime</label>
      <input type="checkbox" id="toggle-slider" onChange={handleToggleSlider} />
      <span> </span>
      <label htmlFor="toggle-slider">Memes</label>
    </div>
  );
};

export default ToggleSlider;
