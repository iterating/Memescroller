const prevBtn = document.querySelector("#prev-img");
const nextBtn = document.querySelector("#next-img");
const randomBtn = document.querySelector("#random");
const imageDisplay = document.querySelector("#image-display");
const animematch = document.querySelector("#animematch");
const analyzeBtn = document.createElement("button");
let imageData = [];
let currentIndex = 0;

// Function to fetch images from Reddit
async function getImage() {
  try {
    const sourceUrls = [
      "https://www.reddit.com/r/animememes/hot/.json?limit=100",
      "https://www.reddit.com/r/animememes/hot/.json?limit=100",
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
prevBtn.addEventListener("click", () => {
  if (imageData && currentIndex > 0) {
    currentIndex--;
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

nextBtn.addEventListener("click", () => {
  if (imageData && currentIndex < imageData.length - 1) {
    currentIndex++;
    animematch.innerHTML = "";
    displayImage(currentIndex);

  }
});

// Function to search anime using backend
async function searchAnime() {
  const imageUrl = imageData[currentIndex].data.url;
  try {
    const response = await fetch(
      `http://localhost:9000/api/search?url=${encodeURIComponent(imageUrl)}`
    );
    const results = await response.json();

    if (!results || results.length === 0) {
      throw new Error("No results found");
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(results);
    displayResults(results);
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to retrieve data");
  }
}

// Function to display results
function displayResults(results) {
  try {
    if (!results || results.length === 0) {
      throw new Error("No results found");
    }
    animematch.innerHTML = "";
    results.forEach((anime) => {
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result");
      resultDiv.innerHTML = `
        <h2>${anime.filename}</h2>
        <p>Episode: ${anime.episode}</p>
        <img src="${anime.image}" />
        <video src="${anime.video}" controls></video>
      `;

      animematch.appendChild(resultDiv);
    });
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to retrieve data");
  }
}
analyzeBtn.textContent = "Analyze";
imageDisplay.appendChild(analyzeBtn);
analyzeBtn.addEventListener("click", searchAnime);

// Fetch images on load
getImage();
