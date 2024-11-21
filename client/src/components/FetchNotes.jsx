import React, { useEffect, useMemo, useRef } from "react";
import axios from "axios";
const apiUrl = 'http://localhost:3000';

const FetchNotes = () => {
  const savedNotesRef = useRef(null);
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    const getLastNote = async () => {
      try {
        const lastNote = localStorage.getItem("lastNote");
        if (lastNote) {
          setNotes([JSON.parse(lastNote)]);
        }
      } catch (error) {
        console.error("Error: Could not parse last note data:", error);
      }
    };
    getLastNote();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get(`${apiUrl}/favorites`);
      if (response && response.data) {
        setNotes(response.data);
      } else {
        console.error("Error: Missing response data");
      }
    };
    fetchNotes();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    localStorage.setItem("lastNote", JSON.stringify({ content: data }));
    setNotes((prevNotes) => [...prevNotes, { content: data }]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <ul
      ref={savedNotesRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ padding: "1rem" }}
    >
      {notes.map((note) => (
        <li key={`${note.title}-${note.content}`} style={{ maxWidth: "600px" }}>{note.content}</li>
      ))}
    </ul>
  );
};

export default FetchNotes;

