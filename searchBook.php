<?php
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Search book</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">

</head>
<body>
<main>
    <div style="position: relative; max-width: 1390px; margin: 0 auto;">
        <div class="bookshelf-search">
            <div class="searchbar">
                <input type="text" id="searchInput" placeholder="Zoek een boek">
                <button id="searchButton" type="button">Zoeken</button>
                <div class="search-box" style="position: absolute; top: 20px; right: 0;">
                    <a href="index.php">Terug naar boekenkast</a>
                </div>
            </div>
            <div class="results-container">
                <div id="results" class="shelf-rows"></div>
            </div>
        </div>
    </div>
    <div class="background-img"></div>
</main>
<script type="text/javascript" src="js/searchBook.js"></script>
</body>
</html>