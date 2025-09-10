<?php
if (isset($_GET['id'])) {
    $bookId = $_GET['id'];
    $apiUrl = "https://www.googleapis.com/books/v1/volumes/$bookId";
    $book = json_decode(file_get_contents($apiUrl), true);
}
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Book details</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="js/bookDetails.js"></script>
</head>
<body>
<main>
    <div style="position: relative; max-width: 1390px; margin: 0 auto;">

        <div id="book-details"></div>
        <div class="background-img"></div>
        <div class="shelfBackground">
            <div class="shelf" id="shelf-background">
                <!--                <h1>--><?php //echo $book['volumeInfo']['title']; ?><!--</h1>-->
            </div>
            <a href="#" id="markAsRead"
               style="display: inline-block; text-decoration: none;
    margin-top: 10px;
    margin-left: 50px;
    padding: 8px 12px;
    background-color: #ffffff;
    color: #088;
    border-radius: 5px;
     font-size: 13px;
border: black;">Markeer
                als gelezen</a>

        </div>
        <div class="search-box" style="position: absolute; top: 20px; right: 0; opacity: 0.7;">
            <a href="index.php">Terug naar boekenkast</a>
        </div>
    </div>

</main>
<script>
    const markAsReadButton = document.getElementById('markAsRead');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];

    if (readBooks.includes(id)) {
        markAsReadButton.textContent = "Markeer als nog niet gelezen";
    } else {
        markAsReadButton.textContent = "Markeer als gelezen";
    }

    markAsReadButton.addEventListener('click', (e) => {
        e.preventDefault();
        let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];

        if (readBooks.includes(id)) {
            readBooks = readBooks.filter(bookId => bookId !== id);
            markAsReadButton.textContent = "Markeer als gelezen";

        } else {
            readBooks.push(id);
            markAsReadButton.textContent = "Markeer als nog niet gelezen";
        }
        localStorage.setItem('readBooks', JSON.stringify(readBooks));
    });
</script>
</body>
</html>