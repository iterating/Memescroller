import axios from "axios";
const API_KEY = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK"

//Create a simple note-taking app where users can create, edit, and organize their notes. Each note can be saved as a paste on Pastebin. 

//Create a new note with the title "My First Note". Then, save the note as "My First Note". 
const note = {
  title: "My First Note",
  content: ""
}

const titleInput = document.querySelector("#note-title");
const contentInput = document.querySelector("#note-content");
const saveBtn = document.querySelector("#save-btn");

titleInput.value = note.title;
contentInput.focus();

saveBtn.addEventListener("click", () => {
  note.title = titleInput.value;
  note.content = contentInput.value;
//save
axios.post("https://pastebin.com/api/api_post.php", {
  api_dev_key: API_KEY,
  api_option: "paste",
  api_paste_code: "${note.content}",
  api_paste_name: "${note.title}",
  api_paste_expire_date : "1H",
  api_paste_private: 1
})
//The note should show up in the "My Notes" tab.
//
//    The note should show up in the "My Notes" tab.

//Edit the note with the title "My First Note". Change the note to "My Second Note".    

//The note should show up in the "My Notes" tab.