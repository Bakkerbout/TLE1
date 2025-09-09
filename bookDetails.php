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
    <a href="index.php">Terug naar boekenkast</a>
    <div class="background-img"></div>
    <div class="shelfBackground">
        <div class="shelf" id="shelf-background">
            <h1><?php echo $book['volumeInfo']['title']; ?></h1>
        </div>
        <a href="index.php">Klaar met lezen</a>
    </div>
</main>
</body>
</html>