// import axios from "axios";
// const PASTEBIN_API_KEY = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK"
// https://www.reddit.com/r/animememes/top/.json?limit=100
const prevBtn = document.querySelector("#prev-img");
const nextBtn = document.querySelector("#next-img");
const imageDisplay = document.querySelector("#image-display");
const currentImg = document.querySelector("#current-img");
let imageData = [];
let currentIndex = 0;

async function getImage() {
  try {
    const response = await axios.get("https://www.reddit.com/r/animememes/hot/.json?limit=1000");
    imageData = response.data.data.children;
    if (imageData && imageData.length > 0) {
      imageDisplay.style.backgroundRepeat = "no-repeat";
      imageDisplay.style.backgroundPosition = "center";
      imageDisplay.style.backgroundSize = "contain";
      imageDisplay.style.backgroundImage = `url(${imageData[currentIndex].data.url})`;
    }
  } catch (err) {
    console.error(err);
    alert("Error fetching data from Reddit");
  } finally {
    prevBtn.addEventListener("click", () => {
      if (imageData && currentIndex > 0) {
        currentIndex--;
        if (imageData.length > 0) {
          imageDisplay.style.backgroundImage = `url(${imageData[currentIndex].data.url})`;
        }
      }
    });
    
    nextBtn.addEventListener("click", () => {
      if (imageData && currentIndex < imageData.length - 1) {
        currentIndex++;
        if (imageData.length > 0) {
          imageDisplay.style.backgroundImage = `url(${imageData[currentIndex].data.url})`;
        }
      }
    });
  }
}

const analyzeBtn = document.createElement("button");
analyzeBtn.textContent = "Analyze";
imageDisplay.appendChild(analyzeBtn);

analyzeBtn.addEventListener("click", () => {
  app.get('/api/search', function (req, res) {
    const url = req.query.url;
    if (!url) {
      res.status(400).send('No URL provided');
      return;
    }
    
      const anime = resData.data.result[0];
      const title = anime.anilist ? anime.anilist.title.romaji : "";
      const episodes = anime.episode || "";
      const time = anime.at || "";
      const similarity = anime.similarity || "";
      const video = anime.video || "";
      const thumbnail = anime.image || "";
      
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result");
      resultDiv.innerHTML = `
        <h2>${title}</h2>
        <p>Episode: ${episodes}</p>
        <p>Time: ${time}</p>
        <p>Similarity: ${similarity}</p>
        <img src="${thumbnail}" />
        <video src="${video}" controls></video>
      `;
      imageDisplay.appendChild(resultDiv);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to retrieve data');
    });
  });


getImage(); 

