const imageDataReducer = (state = [], action) => {
    console.log(`imageDataReducer action.type: ${action.type}`);
    switch (action.type) {
      case "SET_IMAGE_DATA":
        console.log(`imageDataReducer setting state to ${JSON.stringify(action.payload)}`);
        return action.payload;
      default:
        console.log("imageDataReducer returning state");
        return state;
    }
  };
  export default imageDataReducer;