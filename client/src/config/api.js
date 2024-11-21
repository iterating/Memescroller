export const apiSources = {
  animeSceneUrls: [
    "https://www.reddit.com/r/animescreenshots.json?limit=700",
    "https://www.reddit.com/r/animescenery.json?limit=700",
  ],
  animeMemeUrls: [
    "https://www.reddit.com/r/animemes.json?limit=200",
    "https://www.reddit.com/r/goodanimemes.json?limit=600",
    "https://www.reddit.com/r/wholesomeanimemes.json?limit=600",
  ],
}

export const urlFilters = {
  isImageUrl: /\.(jpg|png|gif|webp)$/i,
  // matches any string that ends with .jpg, .png, .gif, or .webp
  isNsfwUrl: /^(?!.*\/nsfw\/).*$/i, 
  // matches any string that does not contain "/nsfw/"
};

export default {}
