fetch("https://www.googleapis.com/books/v1/volumes?q=Harry+Potter&maxResults=40")
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

            let bookDiv = document.createElement("div");

            if (thumbnail) {
                bookDiv.className = "book-cover";
                bookDiv.style.backgroundImage = `url(${thumbnail})`;
            } else {
                bookDiv.className = "book-spine";
                bookDiv.textContent = title;
            }

            shelves[shelfIndex].appendChild(bookDiv);

            if ((i + 1) % 10 === 0 && shelfIndex < shelves.length - 1) {
                shelfIndex++;
            }
        });
    });
