import React, { useEffect, useState, useRef } from "react";


const FetchNotes = () => {
    console.log("FetchNotes");
    const [notes, setNotes] = useState([]);
    const savedNotesRef = useRef(null);
  
    useEffect(() => {
      console.log("FetchNotes useEffect");
      const fetchNotes = async () => {
        try {
          const lastNote = localStorage.getItem("lastNote");
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
  
          if (savedNotesRef.current) {
            savedNotesRef.current.innerHTML = ""; // Clear previous notes
          }
  
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
  
    return (
      <ul ref={savedNotesRef}>
        {notes.map((note) => (
          <li key={`${note.title}-${note.content}`}>
            {`${note.title}-${note.content}`}
          </li>
        ))}
      </ul>
    );
  };


  export default FetchNotes

