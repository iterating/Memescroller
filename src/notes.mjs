const API_KEY = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";

const noteInput = document.querySelector("#note-title");
const contentInput = document.querySelector("#note-content");
const saveButton = document.querySelector("#save-btn");

if (noteInput && contentInput && saveButton) {
  saveButton.addEventListener("click", async () => {
    try {
      const noteTitle = noteInput.value;
      const noteContent = contentInput.value;
      const response = await axios.post(
        "https://pastebin.com/api/api_post.php",
        {
          api_dev_key: API_KEY,
          api_option: "paste",
          api_paste_code: noteContent,
          api_paste_name: noteTitle,
          api_paste_expire_date: "1H",
          api_paste_private: 1,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });
} else {
  console.warn("One or more required elements not found");
}


