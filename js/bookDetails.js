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

    console.log("API data:", book);
    let shelfDiv = document.querySelector(".shelfBackground");
    const {title, authors, description, imageLinks, pageCount} = book.volumeInfo;

    const detailsHTML = document.createElement("div");
    detailsHTML.innerHTML = `
        <h2>${title || "Geen titel"}</h2>
        ${authors ? `<p>Auteur(s): ${authors.join(", ")}</p>` : ""}
        ${imageLinks?.thumbnail ? `<img src="${imageLinks.thumbnail}" alt="${title}">` : ""}
        <p>${description || "Geen beschrijving beschikbaar."}</p>
        <p>Pagecount: ${pageCount || "Informatie niet beschikbaar"}</p>
    `;
    shelfDiv.prepend(detailsHTML);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Voeg toe aan boekenkast";
    addBtn.classList.add("detailPageButton")
    addBtn.style.marginTop = "10px";
    addBtn.addEventListener("click", () => addToBookshelf(book.id));
    shelfDiv.appendChild(addBtn);
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
