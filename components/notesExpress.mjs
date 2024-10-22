const savedNotes = document.getElementById("saved-notes");
const apiUrl = 'http://localhost:3000';



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

document.getElementById("save-note").addEventListener("click", saveNote);

export async function fetchNotes() {
  try {
        /// If cannot get pastebin, save last note from localstorage
        const lastNote = localStorage.getItem("lastNote");
        if (lastNote) {
          try {
            const note = JSON.parse(lastNote);
            if (note && note.content) {
              const listItem = document.createElement("li");
              listItem.textContent = `${note.title}-${note.content}`;
              savedNotes.appendChild(listItem);
            } 
          } catch (error) {
            console.error("Error: Could not parse last note data:", error);
          }
        }

    // Not using Pastebin API login
    // const response = await axios.get(`${apiUrl}/favorites`);
    // if (!response || !response.data) {
    //   console.error("Error: Missing response data");
    //   return;
    // }

    savedNotes.innerHTML = ""; // Clear previous notes
    
    if (!savedNotes.firstChild) {
      const lastNote = JSON.parse(localStorage.getItem("lastNote"));
      if (lastNote) {
        const listItem = document.createElement("li");
        listItem.textContent = `${lastNote.title}-${lastNote.content}`;
        savedNotes.appendChild(listItem);
      }
    }

    // if (response.data.length > 0) {
    //   response.data.forEach((note) => {
    //     if (!note || !note.url) {
    //       console.error("Error: Missing note data");
    //       return;
    //     }
    //     const listItem = document.createElement("li");
    //     listItem.innerHTML = `<a href="${note.url}" target="_blank">${note.title}</a>`;
    //     savedNotes.appendChild(listItem);
    //   });
    // }
  } catch (error) {
    console.error("Error:", error);

  }
}

