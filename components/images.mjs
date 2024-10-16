
// fetch images from Reddit
export async function getImage() {
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

  export function displayImage(index) {
    if (imageData && imageData.length > 0) {
      imageDisplay.style.backgroundRepeat = "no-repeat";
      imageDisplay.style.backgroundPosition = "center";
      imageDisplay.style.backgroundSize = "contain";
      imageDisplay.style.backgroundImage = `url(${imageData[index].data.url})`;
      
    }
  }