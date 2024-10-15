import {  imageUrl   } from "../src/animeme.mjs";
export async function searchAnime() {
  
    if (!imageUrl) {
      console.error("Error: Missing image URL");
      return;
    }
    try {
      const response = await axios.get(
        `https://corsproxy.io/?https://api.trace.moe/search?url=${encodeURIComponent(imageUrl)}`,
        { onDownloadProgress: updateProgress },
      )
      // console.log(response.data.result);
      if  (!response || !response.data) {
        throw new Error("Error: Missing response data");
      }
      const results = response.data.result;
      // Slice and display the top 3 results
      displayResults(results.slice(0, 3));
      
      if (!results || results.length === 0) {
        throw new Error("No results found");
      }
      
      
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to retrieve data");
    }
  }
  
  // Function to display results
export const displayResults = (results) => {
    if (!results || results.length === 0) {
      return;
    }
    const fragment = document.createDocumentFragment();
    results.forEach((anime) => {
      if (!anime) {
        return;
      }
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
