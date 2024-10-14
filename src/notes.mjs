const API_KEY = "l6ccuOpobsa5IisYMP37Epqsb9kP2ZuK";
const apiKey = 'YOUR_PASTEBIN_API_KEY'; // Replace with your Pastebin API key
const userKey = 'YOUR_PASTEBIN_USER_KEY'; // Replace with your Pastebin User key if available

const saveNote = () => {
    const content = document.getElementById('note-content')?.value;

    if (!content) return; // No content to save

    const data = new URLSearchParams();
    data.append('api_dev_key', apiKey);
    data.append('api_option', 'paste');
    data.append('api_paste_code', content);
    data.append('api_paste_private', '1'); // 0=public, 1=unlisted, 2=private
    if (userKey) data.append('api_user_key', userKey);

    axios.post('https://pastebin.com/api/api_post.php', data.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (response.data) {
            const resultElement = document.getElementById('result');
            if (resultElement) {
                resultElement.innerHTML = `Note saved: <a href="${response.data}" target="_blank">${response.data}</a>`;
            }
            fetchNotes();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.innerHTML = `Error: ${error.message}`;
        }
    });
};

const fetchNotes = () => {
    const data = new URLSearchParams();
    data.append('api_dev_key', apiKey);
    data.append('api_option', 'list');
    if (userKey) data.append('api_user_key', userKey);

    axios.post('https://pastebin.com/api/api_post.php', data.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (response.data) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "text/xml");
            const pasteNodes = xmlDoc?.getElementsByTagName('paste');

            if (pasteNodes) {
                const savedNotes = document.getElementById('saved-notes');
                if (savedNotes) {
                    savedNotes.innerHTML = ''; // Clear previous notes
                    for (let i = 0; i < pasteNodes.length; i++) {
                        const paste = pasteNodes[i];
                        const pasteTitle = paste?.getElementsByTagName('paste_title')?.[0]?.textContent;
                        const pasteKey = paste?.getElementsByTagName('paste_key')?.[0]?.textContent;  
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `<a href="https://pastebin.com/${pasteKey}" target="_blank">${pasteTitle || 'Untitled Note'}</a>`;
                        savedNotes.appendChild(listItem);
                    }   
                }
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('result');
        if (resultElement) {
            resultElement.innerHTML = `Error: ${error.message}`;
        }
    });
};

// Fetch saved notes on load
fetchNotes();

