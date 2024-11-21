import axios from "axios";

export const searchAnime = async (imageUrl) => {
  if (!imageUrl) {
    console.error("Error: Missing image URL");
    return [];
  }
  try {
    const response = await axios.get(
      `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(imageUrl)}`
    );
    const data = response.data.result.filter((result) => !result.anilist.isAdult);
    return data.slice(0, 3);
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

export default searchAnime;