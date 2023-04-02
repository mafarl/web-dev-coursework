<!DOCTYPE html>

<script type="text/javascript">
    function hideShow(button) {
        button.style.visibility ="hidden";
        document.getElementById("cards-layout").style.display = "grid";
    }
</script>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pairs</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
    <?php 
        session_start();
        include 'navbar.php';
    ?>
    <script>
        var session_set = <?php echo isset($_SESSION['username']) ? 'true' : 'false'; ?>;
    </script>
    <div id="main">
        <img id="backgroundimage" src="background.jpg" border="0" alt="">
        <div id="game-board">
            <input id="level-storage" value="1" type="hidden">
            <button type="button" id="button-to-start-game" onclick='hideShow(this);'>Start the game</button>
            <div id="cards-layout" style="display:none;">
                <!-- Create a hidden element that will have a value which equals to the level.
                    JavaScript will get the value of this element to generate the proper number of card. 
                    Once created the board, increase the value and then once won - create new board (new level).
                    If lost - value back to 1. -->
                
            </div>
        </div>
    </div>
    <script src="pairs-cards.js"></script>
</body>
</html>
