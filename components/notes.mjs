
const pastebinKey = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";

export async function saveNote() {
  const content = document.getElementById('note-content').value;
  const noteTitle = document.getElementById('note-title').value;

  await axios.post(('https://pastebin.com/api/api_post.php'), {    
      api_paste_name: noteTitle, 
      api_paste_code: content, 
      api_dev_key: pastebinKey ,
      api_user_key: localStorage.getItem('api-user-key') || '',
      api_option: 'paste'
  })    
  .then(response => {
      document.getElementById('result').innerHTML = `Note saved: <a href="${response.data.url}" target="_blank">${response.data.url}</a>`;
      localStorage.setItem('api-user-key', userKey);
      fetchNotes();
  })
  .catch(error => {
      console.error('Error:', error);
  });
};

  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function fetchNotes () {
  // Pastbin API says use POST
    await axios.post(('https://pastebin.com/api/api_post.php'), {    

          api_dev_key: pastebinKey,
          api_user_key: localStorage.getItem('api-user-key') || '',
          api_option: 'list'
        })
    .then(response => { 
        if (!response.data) {
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



