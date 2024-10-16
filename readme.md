[App link](https://animeme-scroller.netlify.app/)

[Github pages](iterating.github.com/308.sba)
## Animeme
Swipe through beautiful anime screenshots and scenery or anime memes. Use the arrow buttons or swipe movements to navigate.

Click on a picture to get details of which anime and episode the scene is from. Press a button to save this information to a note to save or share. 

Click the toggle to switch to meme mode. 

← → ← → ↓ ↑ for easter egg

## Design
Trace.moe, ~~deviantart~~, reddit, and pastebin APIs were utilized in this app. Array filter methods and regex were used to power the logic in organizing and processing the data.   
Hammerjs was utilized for swipe navigation.  

Express.js backend was hosted with netlify due to CORS issues with external APIs. The backend has the notes, favorites, and search API endpoints that are accessed by axios from the server. Error handling diagnoses possible failure points in the app for easier troubleshooting. localStorage is used to save notes data across sessions in case of disruptions in the Pastebin API. 

Reddit API was used as an interesting example of a crowdsourced, crowd structured database. As a result of the crowdsourced nature, there is a risk of memes of questionable taste appearing on the app. 
DocumentFragment and DOM methods are used to build content.
Asynchronous functions were applied to keep an engaging user flow. 

Mobile first UX design ensures tactile enjoyment and an engaging expereince on any device cabable of running a compatible web browser. 

**Objectives**

- Use asynchronous JavaScript tools to build a responsive web application.
- Demonstrate understanding of the JavaScript event loop.
- Generate asynchronous code using Promises and async/await syntax.
- Use fetch and/or Axios to interact with an external web API.
- Organize files using modules and imports.

