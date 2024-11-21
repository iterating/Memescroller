[Source Link](https://github.com/iterating/Memescroller)

[Netlify Link](https://animeme-scroller.netlify.app/)

## Memescroller
- Swipe through beautiful anime screenshots and scenery or anime memes. Use the arrow buttons or swipe movements to navigate.
    - Hammerjs is used for swipe actions
        - For now, the app is limited to swiping outside of the image

- Click on a picture to get details of which anime and episode the scene is from. Press a button to save this information to a note to save or share. 
    - The text fields are drag and drop enabled
    - Notes are stored to localStorage and persists across refreshes and sessions

- Click the toggle to switch to meme mode. 

## React
The app was structured into components, each with a single responsibility. The components were given a single job to do, and were not concerned with the implementation details of other components. This made it easier to understand and maintain the codebase. Every component was given a single job to do, and was not concerned with the implementation details of other components. This made it easier to understand and maintain the codebase.
- /components containts React components of the app
    - /components/buttons contains button components
- /utils contains helper functions
- /stores contains the Redux store and reducers
    - Redux is used to manage the state of the app
- /config sets the API sources and filters to be used for the images

## Node.js backend
- a simple Express backend, following MVC architecture and basic Bulletproof NodeJS best practices interacts with Pastebin API without CORS issues
- API, middleware, and routes are contained in /api folder

## Design
A responsive web application was built using React, trace.moe, reddit, and pastebin APIs. Vite, a build tool, was used to bundle the code. The app was built with a mobile-first approach to ensure a tactile experience on any device capable of running a compatible web browser. Array filter methods and regex were used to power the logic in organizing and processing the data.   

Express.js backend was hosted with netlify due to CORS issues with external APIs. The backend has the notes, favorites, and search API endpoints that are accessed by axios from the server. Error handling diagnoses possible failure points in the app for easier troubleshooting. localStorage is used to save notes data across sessions in case of disruptions in the Pastebin API. 

Reddit API was used as an interesting example of a crowdsourced, crowd structured database. As a result of the crowdsourced nature, there is a risk of memes of questionable taste appearing on the app. 

Due to limitations of the Pastebin API, the Pastebin note saving will not work if used past a certain amount of times a day. The localStorage backup is then used to save your notes. 

DocumentFragment and DOM methods are used to build content.
Asynchronous functions were applied to keep an engaging user flow. 


## Useage 
`npm start` to run server and client

![Scroll Images](https://i.imgur.com/pyZT5EU.png)

![Find the Source](https://i.imgur.com/8oAObWo.png)