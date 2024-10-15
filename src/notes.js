const pastebinAPI = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";
const saveNote = () => {
    const noteTitle = document.getElementById('note-title');
    const content = document.getElementById('note-content');

    if (!noteTitle || !content) {
      console.error('Error: Missing note content or title elements');
      return;
    }

    const api_paste_code = content.value.trim();
    const api_paste_name = noteTitle.value.trim();
  
    if (!api_paste_code || !api_paste_name) {
      console.error('Error: Missing note content or title');
      return;
    }

    const data = new URLSearchParams();
    data.append('api_dev_key', pastebinAPI);
    data.append('api_option', 'paste');
    data.append('api_paste_code', api_paste_code);
    data.append('api_paste_name', api_paste_name);
    data.append('api_paste_private', '1'); // 0=public, 1=unlisted, 2=private

    console.log('Sending data:', data);

    axios.post('http://localhost:9000/notes', data)
    .then(response => {
      if (!response || !response.data) {
        console.error('Error: Missing response data', response);
        return;
      }
  
      const resultElement = document.getElementById('result');
      if (!resultElement) {
        console.error('Error: Missing result element');
        return;
      }
  
      resultElement.innerHTML = `Note saved: <a href="${response.data.url}" target="_blank">${response.data.url}</a>`;
      // Cache user key to local storage
      if (localStorage) {
        localStorage.setItem('api-user-key', pastebinAPI);
      }
      fetchNotes();
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error here, for example:
      const resultElement = document.getElementById('result');
      if (resultElement) {
        resultElement.innerHTML = 'Error saving note: ' + error.message;
      } else {
        console.error('Error: Missing result element');
      }
    });
  };

if (document.getElementById('save-note')) {
    document.getElementById('save-note').addEventListener('click', saveNote);
}

const fetchNotes = () => {
    axios.get('http://localhost:9000/favorites')
    .then(response => {
        if (!response || !response.data) {
            console.error('Error: Missing response data');
            return;
        }

        const notes = response.data;
        const savedNotes = document.getElementById('saved-notes');
        if (!savedNotes) {
            console.error('Error: Missing saved-notes element');
            return;
        }

        savedNotes.innerHTML = ''; // Clear previous notes
        if (notes && notes.length > 0) {
          notes.forEach(note => {
            if (!note || !note.url || !note.title) {
                console.error('Error: Missing note data');
                return;
            }

            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${note.url}" target="_blank">${note.title}</a>`;
            savedNotes.appendChild(listItem);
          });
        } else {
          console.error('Error: No notes found');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

// Fetch user's pastes on load
if (document.getElementById('saved-notes')) {
    fetchNotes();
}


