const savedNotes = document.getElementById("saved-notes");

export async function saveNote() {
  const content = document.getElementById("note-content")?.value;
  const noteTitle = document.getElementById("note-title")?.value;
  if (!content ) {
    console.error("Error: Missing note title or content");
    return;
  }
  try {
    const response = await axios.post("/notes");
    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return;
    }
    document.getElementById("animematch").innerHTML = `Note saved: <a href="${response.data.url}" target="_blank">${response.data.url}</a>`;
    localStorage.setItem("api-user-key", userKey);
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
    const response = await axios.get("/favorites");
    if (!response || !response.data) {
      console.error("Error: Missing response data");
      return;
    }

    savedNotes.innerHTML = ""; // Clear previous notes
    
    if (!savedNotes.firstChild) {
      const lastNote = JSON.parse(localStorage.getItem("lastNote"));
      if (lastNote) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${lastNote.title}- ${lastNote.content}`;
        savedNotes.appendChild(listItem);
      }
    }

    if (response.data.length > 0) {
      response.data.forEach((note) => {
        if (!note || !note.url || !note.title) {
          console.error("Error: Missing note data");
          return;
        }
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${note.url}" target="_blank">${note.title}</a>`;
        savedNotes.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Error:", error);
    /// If cannot get pastebin, save last note from localstorage
    const lastNote = localStorage.getItem("lastNote");
    if (lastNote) {
      try {
        const note = JSON.parse(lastNote);
        if (note && note.content) {
          const listItem = document.createElement("li");
          listItem.innerHTML = `${note.title}- ${note.content}`;
          savedNotes.appendChild(listItem);
        } 
      } catch (error) {
        console.error("Error: Could not parse last note data:", error);
      }
    }
  }
}

