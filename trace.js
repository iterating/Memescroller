const axios = require('axios');

let url = 'https://i.redd.it/2e6f0pm81nud1.jpeg'


async function getImages() {
    try {
        const traceResponse = await axios.post( `https://api.trace.moe/search?url=${encodeURIComponent(
            "https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg"     
        )}`);
        if (traceResponse && traceResponse.data) {
            console.log(traceResponse.data);
        } else {
            console.error('No data returned from Trace.moe API');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
getImages();

