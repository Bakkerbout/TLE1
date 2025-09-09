window.addEventListener('load', init);

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=40"

function init() {
    loadBooks()
}

function loadBooks() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const shelves = [
                document.getElementById("shelf-1"),
                document.getElementById("shelf-2"),
                document.getElementById("shelf-3"),
                document.getElementById("shelf-4"),
                document.getElementById("shelf-5")
            ];

            let shelfIndex = 0;

            data.items.forEach((book, i) => {
                const title = book.volumeInfo.title;
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
                const bookId = book.id;

                let bookDiv = document.createElement("div");
                bookDiv.className = "book-spine";

                if (thumbnail) {
                    let img = document.createElement("img");
                    img.src = thumbnail;
                    img.alt = title;
                    bookDiv.appendChild(img);
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