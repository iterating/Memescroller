const sourceUrlsReducer = (state = [], action) => {
    console.log(`sourceUrlsReducer action.type: ${action.type}`);
    switch (action.type) {
      case "SET_SOURCE_URLS":
        console.log(`sourceUrlsReducer setting state to ${JSON.stringify(action.payload)}`);
        return action.payload;
      default:
        console.log("sourceUrlsReducer returning state");
        return state;
    }
  };

  export default sourceUrlsReducer;