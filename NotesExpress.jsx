const savedNotes = document.getElementById("saved-notes");
const apiUrl = 'http://localhost:3000';
import axios from "axios";



export async function saveNote() {
  const content = document.getElementById("note-content")?.value;
  const noteTitle = document.getElementById("note-title")?.value;
  if (!content ) {
    console.error("Error: Missing note title or content");
    return;
  }
  try {
    const response = await axios.post(`${apiUrl}/notes`, {
      api_paste_name: noteTitle,
      api_paste_code: content,
    });
    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return;
    }
console.log(response.data.url);
    document.getElementById("saved-pastes").innerHTML = `Note saved: <a href="${response.data.url}" target="_blank">${response.data.url}</a>`;
    // localStorage.setItem("api-user-key", userKey);
    fetchNotes();
  } catch (error) {
    console.error("Error:", error);
    /// If cannot get pastebin, save last note from localstorage
    localStorage.setItem("lastNote", JSON.stringify({
      title: noteTitle,
      content: content,
    }));
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelector("#save-note").onclick = saveNote;
});

export const FetchNotes = () => {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        /// If cannot get pastebin, save last note from localstorage
        const lastNote = localStorage.getItem("lastNote");
        if (lastNote) {
          try {
            const note = JSON.parse(lastNote);
            if (note && note.content) {
              setNotes((prevNotes) => [...prevNotes, { title: note.title, content: note.content }]);
            } 
          } catch (error) {
            console.error("Error: Could not parse last note data:", error);
          }
        }

        const response = await axios.get(`${apiUrl}/favorites`);
        if (!response || !response.data) {
          console.error("Error: Missing response data");
          return;
        }

        setNotes(response.data);

      } catch (error) {
        console.error("Error:", error);

      }
    };

    fetchNotes();
  }, []);

  return (
    <ul id="saved-notes">
      {notes.length > 0 && notes.map((note) => (
        <li key={note.url}>
          <a href={note.url} target="_blank">{note.title}</a>
        </li>
      ))}
    </ul>
  );
}


export default fetchNotes;