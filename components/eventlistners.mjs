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