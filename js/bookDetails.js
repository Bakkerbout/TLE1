window.addEventListener("load", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    if (bookId) {
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(res => res.json())
            .then(book => displayBookDetails(book, bookId))
            .catch(err => console.error("Error loading book:", err));
    }
}

function displayBookDetails(book) {
    const detailsDiv = document.getElementById("book-details");
    const {title, authors, description, imageLinks} = book.volumeInfo;

    detailsDiv.innerHTML = `
        <h2>${title || "Geen titel"}</h2>
        ${authors ? `<p>Auteur(s): ${authors.join(", ")}</p>` : ""}
        ${imageLinks?.thumbnail ? `<img src="${imageLinks.thumbnail}" alt="${title}">` : ""}
        <p>${description || "Geen beschrijving beschikbaar."}</p>
    `;

    let addBtn = document.createElement("button");
    addBtn.textContent = "Voeg toe aan boekenkast";

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    addBtn.addEventListener("click", () => addToBookshelf(bookId));
    detailsDiv.appendChild(addBtn);
}

function addToBookshelf(bookId) {
    let shelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (!shelf.includes(bookId)) {
        shelf.push(bookId);
        localStorage.setItem("bookshelf", JSON.stringify(shelf));
        alert("Boek toegevoegd aan je boekenkast!");
    } else {
        alert("Dit boek staat al in je boekenkast.");
    }
}
