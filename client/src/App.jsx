import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveNote, fetchNotes } from "./components/NotesExpress.jsx";

const ImageDisplay = ({ imageData, currentIndex }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const displayImage = async () => {
      const newImageUrl = imageData[currentIndex]?.data?.url;
      if (!newImageUrl) {
        console.warn("Invalid image data for the current index:", currentIndex);
        return;
      }
      setImageUrl(newImageUrl);
    };
    displayImage();
  }, [currentIndex, imageData]);

  return (
    <div id="image-display" style={{ backgroundImage: `url(${imageUrl})` }}></div>
  );
};

const Animematch = ({ imageData, currentIndex }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchAnime = async () => {
      const imageUrl = imageData[currentIndex]?.data?.url;
      if (!imageUrl) {
        console.error("Error: Missing image URL");
        return;
      }
      try {
        const response = await axios.get(
          `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
            imageUrl
          )}`
        );
        const newResults = response.data.result.filter(
          (result) => !result.anilist.isAdult
        );
        if (newResults && newResults.length > 0) {
          setResults(newResults.slice(0, 3));
        } else {
          throw new Error("No results found");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to retrieve data");
      }
    };
    searchAnime();
  }, [imageData, currentIndex]);

  const displayResults = (results) => {
    return results.map((anime, index) => (
      <div key={index} className="result">
        <h2>{anime.filename}</h2>
        <p>Episode: {anime.episode}</p>
        <video src={anime.video} controls></video>
        <button onClick={() => appendToNoteContent(anime)}>
          Add Title and Episode to Note
        </button>
      </div>
    ));
  };

  const appendToNoteContent = (anime) => {
    const noteContent = document.getElementById("note-content");
    if (noteContent) {
      noteContent.value += `\n${anime.filename} - Episode ${anime.episode}\n`;
    }
  };

  return <div id="animematch">{displayResults(results)}</div>;
};

const ButtonBar = ({
  imageData,
  currentIndex,
  setCurrentIndex,
  searchAnime,
}) => {
  const nextBtnClick = () => {
    if (currentIndex < imageData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      searchAnime();
    }
  };

  const prevBtnClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      searchAnime();
    }
  };

  const randomBtnClick = () => {
    if (imageData.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * imageData.length));
      searchAnime();
    }
  };

  const analyzeBtnClick = () => {
    searchAnime();
  };

  return (
    <div>
      <button id="prev-img" onClick={prevBtnClick}>
        ⇐
      </button>
      <button id="random" onClick={randomBtnClick}>
        ⇑
      </button>
      <button id="analyze-btn" onClick={analyzeBtnClick}>
        ⇓
      </button>
      <button id="next-img" onClick={nextBtnClick}>
        ⇒
      </button>
    </div>
  );
};

const NoteSection = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleNoteChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleNoteContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleSaveNote = async () => {
    const newNote = {
      title: noteTitle,
      content: noteContent,
    };
    await saveNote();
    fetchNotes();
    setNoteTitle("");
    setNoteContent("");
  };

  return (
    <div id="notes">
      <p>Notes</p>
      <input
        type="text"
        id="note-title"
        value={noteTitle}
        placeholder="Note Title"
        onChange={handleNoteChange}
      />
      <br />
      <textarea
        id="note-content"
        value={noteContent}
        rows="10"
        cols="10"
        placeholder="Your note content..."
        onChange={handleNoteContentChange}
      ></textarea>
      <br />
      <button id="save-note" onClick={handleSaveNote}>
        Save Note
      </button>
      <h4>Saved Notes</h4>
      <ul id="saved-pastes"></ul>
      <ul id="saved-notes" style={{ overflowY: "scroll", maxHeight: "300px" }}></ul>
    </div>
  );
};

const ToggleSlider = ({ setSourceUrls }) => {
  const [checked, setChecked] = useState(false);

  const handleToggleSlider = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setSourceUrls([
        "https://www.reddit.com/r/animemes.json?limit=200",
        "https://www.reddit.com/r/goodanimemes.json?limit=600",
        "https://www.reddit.com/r/wholesomeanimemes.json?limit=400",
      ]);
    } else {
      setSourceUrls([
        "https://www.reddit.com/r/animescreenshots.json?limit=700",
        "https://www.reddit.com/r/animescenery.json?limit=700",
      ]);
    }
  };

  return (
    <div>
      <label htmlFor="toggle-slider">Anime</label>
      <input
        type="checkbox"
        id="toggle-slider"
        checked={checked}
        onChange={handleToggleSlider}
      />
      <label htmlFor="toggle-slider">Memes</label>
    </div>
  );
};

const App = () => {
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sourceUrls, setSourceUrls] = useState([
    "https://www.reddit.com/r/animescreenshots.json?limit=700",
    "https://www.reddit.com/r/animescenery.json?limit=700",
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responses = await Promise.all(
          sourceUrls.map((url) => axios.get(url))
        );
        const data = responses
          .map((res) => res.data.data.children)
          .flat()
          .filter((post) => /\.(jpg|png|gif|webp)$/i.test(post.data.url));
        setImageData(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, [sourceUrls]);

  const searchAnime = async () => {
    const imageUrl = imageData[currentIndex]?.data?.url;
    if (!imageUrl) {
      console.error("Error: Missing image URL");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
          imageUrl
        )}`
      );
      const results = response.data.result.filter(
        (result) => !result.anilist.isAdult
      );
      if (results && results.length > 0) {
        displayResults(results.slice(0, 3));
      } else {
        throw new Error("No results found");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to retrieve data");
    }
  };

  return (
    <div>
      <ImageDisplay imageData={imageData} currentIndex={currentIndex} />
      <Animematch imageData={imageData} currentIndex={currentIndex} />
      <ButtonBar
        imageData={imageData}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        searchAnime={searchAnime}
      />
      <NoteSection />
      <ToggleSlider setSourceUrls={setSourceUrls} />
      <div id="progressBar" className="progress-bar-top" style={{ transition: "width 1s ease" }}></div>
    </div>
  );
};

export default App;

