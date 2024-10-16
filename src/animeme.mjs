import { axiosInterceptor, updateProgress } from "../components/loadingbar.mjs";
import { saveNote, fetchNotes } from "../components/notesExpress.mjs";

const prevBtn = document.querySelector("#prev-img");
const nextBtn = document.querySelector("#next-img");
const randomBtn = document.querySelector("#random");
const imageDisplay = document.querySelector("#image-display");
const animematch = document.querySelector("#animematch");
const analyzeBtn = document.querySelector("#analyze-btn");
const progressBar = document.getElementById("progressBar");

let imageData = [];
let currentIndex = 10;

let sourceUrls = [
  "https://www.reddit.com/r/animescreenshots.json?limit=700",
  "https://www.reddit.com/r/animescenery.json?limit=700",
  // "https://www.reddit.com/r/Animewallpaper.json?limit=70",
];

document.querySelector("#toggle-slider").addEventListener("change", (e) => {
    if (e.target.checked) {
    sourceUrls = [
      "https://www.reddit.com/r/animemes.json?limit=400",
      "https://www.reddit.com/r/goodanimemes.json?limit=600",
      "https://www.reddit.com/r/wholesomeanimemes.json?limit=400",
      "https://www.reddit.com//r/AnimeMeme.json?limit=100",
      "https://www.reddit.com/r/anime_irl.json?limit=300",
      "https://www.reddit.com/r/animememes.json?limit=70",
    ];
    } else {
    sourceUrls = [
      "https://www.reddit.com/r/animescreenshots.json?limit=700",
      "https://www.reddit.com/r/animescenery.json?limit=700",
      // "https://www.reddit.com/r/Animewallpaper.json?limit=200"
      ];
      
    }
    getImage();
  });

// Function to fetch images from Reddit
async function getImage() {
  const responses = await Promise.allSettled(
    sourceUrls.map((url) => axios.get(url))
    
  );
  const data = responses
    .filter((res) => res.status === "fulfilled")
    .flatMap((res) => res.value.data.data.children);
  imageData = data
    //regex filter ending with image format
    .filter((post) => /\.(jpg|png|gif|webp)$/i.test(post.data.url) 
    //regex filter out nsfw  
    && !/\/nsfw\//i.test(post.data.url)
    //regex filter out i.imgur.com
    && !/i\.imgur\.com/i.test(post.data.url))
    .map((post) => post.data.url);
    //randomize the order of images in the array
    imageData.sort(() => Math.random() - 0.5);

}

getImage().then(() => displayImage(currentIndex));

// Function to display image based on index
function displayImage(index) {
  const imageUrl = imageData[index];
  
  if (imageUrl) {
    imageDisplay.style.backgroundRepeat = "no-repeat";
    imageDisplay.style.backgroundPosition = "center";
    imageDisplay.style.backgroundSize = "contain";
    imageDisplay.style.backgroundImage = `url(${imageUrl})`;
  } else {
    console.warn("Invalid image data for the current index:", index);
  }
}

// Event listeners for navigation buttons
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex > 0) {
        currentIndex--;
        animematch.innerHTML = "";
        displayImage(currentIndex);
      }
      break;
    case "ArrowUp":
      if (imageData.length > 0) {
        currentIndex = Math.floor(Math.random() * imageData.length);
        animematch.innerHTML = "";
        displayImage(currentIndex);
      }
      break;
    case "ArrowRight":
      if (currentIndex < imageData.length - 1) {
        currentIndex++;
        animematch.innerHTML = "";
        displayImage(currentIndex);
      }
      break;
    case "ArrowDown":
      analyzeBtn.click();
      break;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    animematch.innerHTML = "";
    displayImage(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < imageData.length - 1) {
    currentIndex++;
    animematch.innerHTML = "";
    displayImage(currentIndex);
  }
});

randomBtn.addEventListener("click", () => {
  if (imageData.length > 0) {
    currentIndex = Math.floor(Math.random() * imageData.length);
    animematch.innerHTML = "";
    displayImage(currentIndex);
  }
});
// Swipe and tap events for mobile
const hammertime = new Hammer(imageDisplay);
hammertime.on("swipeleft", () => nextBtn.click());
hammertime.on("swiperight", () => prevBtn.click());
hammertime.on("swipeup", () => randomBtn.click());
hammertime.on("swipedown", () => analyzeBtn.click());
imageDisplay.addEventListener("click", () => analyzeBtn.click());
analyzeBtn.addEventListener("click", searchAnime);

// Function to search anime using backend
async function searchAnime() {
  const imageUrl = imageData[currentIndex];
  if (!imageUrl) {
    console.error("Error: Missing image URL");
    return;
  }
  try {
    const response = await axios.get(
      `https://corsproxy.io/?https://api.trace.moe/search?url=${encodeURIComponent(
        imageUrl
      )}`,
      { onDownloadProgress: updateProgress }
    );

    const results = response?.data?.result;
    if (results && results.length > 0) {
      displayResults(results.slice(0, 3));
    } else {
      throw new Error("No results found");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to retrieve data");
  }
}

// Function to display results
const displayResults = (results) => {
  if (!results || results.length === 0) {
    return;
  }
  const fragment = document.createDocumentFragment();
  results.forEach((anime) => {
    if (!anime) return;

    const resultDiv = document.createElement("div");
    resultDiv.classList.add("result");
    resultDiv.innerHTML = `
      <h2>${anime.filename}</h2>
      <p>Episode: ${anime.episode}</p>      
      <video src="${anime.video}" controls></video>
    `;
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Add Title and Episode to Note";
    copyBtn.addEventListener("click", () => {
      const noteContent = document.getElementById("note-content");
      if (noteContent) {
        noteContent.value += `\n${anime.filename} - Episode ${anime.episode}\n`;
      }
    });
    resultDiv.appendChild(copyBtn);
    fragment.appendChild(resultDiv);
  });
  animematch.innerHTML = "";
  animematch.appendChild(fragment);
};

document.getElementById("save-note")?.addEventListener("click", saveNote);

axiosInterceptor();
fetchNotes();
