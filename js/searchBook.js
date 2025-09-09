document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('searchButton').addEventListener('click', function () {
        const query = document.getElementById('searchInput').value;
        if (query) {
            fetchData(query);
        } else {
            alert('Voer een zoekterm in!');
        }
    });
})

async function fetchData(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`; // Vervang met jouw API-link
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Fout bij het ophalen van gegevens');
        const data = await response.json();
        console.log("API data:", data);
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = 'Er is een fout opgetreden.';
    }
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Oude resultaten wissen
    if (data && data.items && data.items.length > 0) {
        data.items.forEach(item => {
            const info = item.volumeInfo;

            // Maak een container
            const div = document.createElement('div');
            div.classList.add('book');

            // Titel
            const title = document.createElement('h3');
            title.textContent = info.title || 'Geen titel';
            div.appendChild(title);

            // Auteurs
            if (info.authors) {
                const authors = document.createElement('p');
                authors.textContent = "Auteur(s): " + info.authors.join(', ');
                div.appendChild(authors);
            }

            // Thumbnail
            if (info.imageLinks && info.imageLinks.thumbnail) {
                const img = document.createElement('img');
                img.src = info.imageLinks.thumbnail;
                img.alt = info.title;
                div.appendChild(img);
            }

            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.innerHTML = 'Geen resultaten gevonden.';
    }
}
