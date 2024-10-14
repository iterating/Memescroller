const saveNote = () => {
    const content = document.getElementById('note-content').value;

    axios.post('http://localhost:3000/notes', { content })
    .then(response => {
        document.getElementById('result').innerHTML = `Note saved: <a href="${response.data.url}" target="_blank">${response.data.url}</a>`;
        fetchNotes();
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const fetchNotes = () => {
    axios.post('http://localhost:3000/favorites')
    .then(response => {
        const notes = response.data;
        const savedNotes = document.getElementById('saved-notes');
        savedNotes.innerHTML = ''; // Clear previous notes
        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${note.url}" target="_blank">${note.title}</a>`;
            savedNotes.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

// Fetch saved notes on load
fetchNotes();
