import { createStore, combineReducers } from "redux";
import * as api from "../config/api";

const initialState = {
  sourceUrls: api.apiSources.animeSceneUrls
};

const rootReducer = combineReducers({
  sourceUrls: (state = initialState.sourceUrls, { type, payload }) =>
    type === "SET_SOURCE_URLS" ? payload : state,
  imageData: (state = [], { type, payload }) =>
    type === "SET_IMAGE_DATA" ? payload : state,
  newContent: (state = "", { type, payload }) =>
    type === "ADD_NOTE_CONTENT" ? state + payload : state,
});

const store = createStore(rootReducer);

export default store;
