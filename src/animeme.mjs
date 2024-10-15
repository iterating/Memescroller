const prevBtn = document.querySelector("#prev-img");
const nextBtn = document.querySelector("#next-img");
const randomBtn = document.querySelector("#random");
const imageDisplay = document.querySelector("#image-display");
const animematch = document.querySelector("#animematch");
const analyzeBtn = document.querySelector("#analyze-btn");
let imageData = [];
let currentIndex = 5;

// Function to fetch images from Reddit
async function getImage() {
  try {
    // axios get from an array of urls
    const sourceUrls = [
      "https://www.reddit.com/r/animemes/hot/.json?limit=500",
      "https://www.reddit.com/r/animememes/hot/.json?limit=500",
    ];

    const response = await Promise.allSettled(
      sourceUrls.map((url) => axios.get(url))
    );

    imageData = response[0].value.data.data.children;
    if (imageData && imageData.length > 0) {
      displayImage(currentIndex);
    }
  } catch (err) {
    console.error(err);
    alert("Error fetching data from Reddit");
  }
}
window.addEventListener("DOMContentLoaded", getImage);

// Function to display image based on index
function displayImage(index) {
  if (imageData && imageData.length > 0) {
    imageDisplay.style.backgroundRepeat = "no-repeat";
    imageDisplay.style.backgroundPosition = "center";
    imageDisplay.style.backgroundSize = "contain";
    imageDisplay.style.backgroundImage = `url(${imageData[index].data.url})`;
  }
}

// Event listeners for navigation buttons
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      if (imageData && currentIndex > 0) {
        currentIndex--;
        animematch.innerHTML = "";
        displayImage(currentIndex);
      }
      break;
    case "ArrowUp":
      if (imageData && imageData.length > 0) {
        currentIndex = Math.floor(Math.random() * imageData.length);
        animematch.innerHTML = "";
        displayImage(currentIndex);
      }
      break;
    case "ArrowRight":
      if (imageData && currentIndex < imageData.length - 1) {
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
  if (imageData && currentIndex > 0) {
    currentIndex--;
    animematch.innerHTML = "";
    displayImage(currentIndex);
  }
});
nextBtn.addEventListener("click", () => {
  if (imageData && currentIndex < imageData.length - 1) {
    currentIndex++;
    animematch.innerHTML = "";
    displayImage(currentIndex);
  }
});
randomBtn.addEventListener("click", () => {
  if (imageData && imageData.length > 0) {
    currentIndex = Math.floor(Math.random() * imageData.length);
    animematch.innerHTML = "";
    displayImage(currentIndex);
  }
});

analyzeBtn.addEventListener("click", searchAnime);


// Function to search anime using backend
async function searchAnime() {
  const imageUrl = imageData[currentIndex].data.url;
  
  try {
    const response = await fetch(
      `/api/search?url=${encodeURIComponent(imageUrl)}`
      
    );
    const results = await response.json();

    if (!results || results.length === 0) {
      throw new Error("No results found");
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Slice and display the top 3 results
    displayResults(results.slice(0, 3));
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
}

