import React, { useEffect, useState, useRef } from "react";

const FetchNotes = () => {
  console.log("FetchNotes");

  // Initialize notes state as an empty array
  const [notes, setNotes] = useState([]);
  const savedNotesRef = useRef(null);

  useEffect(() => {
    console.log("FetchNotes useEffect");

    const fetchNotes = async () => {
      try {
        const lastNote = localStorage.getItem("lastNote");
        
        // If lastNote exists in localStorage, parse it and add it to notes state
        if (lastNote) {
          try {
            const note = JSON.parse(lastNote);
            if (note && note.content) {
              setNotes((prevNotes) => [...prevNotes, note]);
            }
          } catch (error) {
            console.error("Error: Could not parse last note data:", error);
          }
        }

        // Optional: Clear any previous notes in savedNotesRef
        if (savedNotesRef.current) {
          savedNotesRef.current.innerHTML = ""; // Clear previous notes
        }

        // Fetch notes from localStorage if saved in previous sessions
        if (savedNotesRef.current && !savedNotesRef.current.firstChild) {
          const lastNote = JSON.parse(localStorage.getItem("lastNote"));
          if (lastNote) {
            setNotes([lastNote]);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
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
        <li key={`${note.title}-${note.content}`}>
          {note.content}
        </li>
      ))}
    </ul>
  );
};

export default FetchNotes;

