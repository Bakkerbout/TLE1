window.addEventListener('load', init);

function init() {
    loadBooks();
}

function loadBooks() {
    const shelves = [
        document.getElementById("shelf-1"),
        document.getElementById("shelf-2"),
        document.getElementById("shelf-3"),
        document.getElementById("shelf-4"),
        document.getElementById("shelf-5")
    ];

    // alles eerst leegmaken
    shelves.forEach(shelf => shelf.innerHTML = "");

    let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

    if (bookshelf.length === 0) {
        shelves[0].innerHTML = "<p>Je boekenkast is nog leeg. Voeg boeken toe via de zoekfunctie.</p>";
        return;
    }

    let shelfIndex = 0;

    bookshelf.forEach((bookId, i) => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(res => res.json())
            .then(book => {
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;

                let bookDiv = document.createElement("div");
                bookDiv.className = "book-spine";
                bookDiv.dataset.id = bookId;

                if (readBooks.includes(bookId)) {
                    bookDiv.classList.add("read");
                }

                let bookTitle = document.createElement("p");
                bookTitle.textContent = title;
                bookDiv.appendChild(bookTitle);

                let link = document.createElement("a");
                link.href = `bookDetails.php?id=${bookId}`;
                link.appendChild(bookDiv);

                shelves[shelfIndex].appendChild(link);

                if ((i + 1) % 10 === 0 && shelfIndex < shelves.length - 1) {
                    shelfIndex++;
                }
            });
    });
}