<!DOCTYPE html>

<script type="text/javascript">
    function hideShow(button) {
        button.style.visibility ="hidden";
        document.getElementById("cards-layout").style.display = "grid";
        document.getElementById("attempts-container").style.display = "block";
        document.getElementById("timer-container").style.display = "block";

        const overallAttempts = document.createElement("h3");
        const textNode1 = document.createTextNode("Overall attempts: " + 0);
        overallAttempts.appendChild(textNode1);

        const currentAttempts = document.createElement("h3");
        const textNode2 = document.createTextNode("Level " + 1 + " score: " + 0);
        currentAttempts.appendChild(textNode2);

        const parent = document.getElementById("attempts-container");
        parent.appendChild(overallAttempts);
        parent.appendChild(currentAttempts);
        
        var timeToStart = new Date();
        var timeGiven = new Date();
        timeGiven.setSeconds(timeToStart.getSeconds() + 300);

        document.body.setAttribute("data-time-to-start", timeToStart);
        document.body.setAttribute("data-time-given", timeGiven);

        const time = document.createElement("h3");
        time.setAttribute("id", "h3-timer");
        const textNode3 = document.createTextNode("Time left: " + 300 + " seconds");
        time.appendChild(textNode3);

        const timeParent = document.getElementById("timer-container");
        timeParent.appendChild(time);
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
        <div id="timer-container" style="display:none; color:white;"></div>
        <div id="attempts-container" style="display:none; color:white;"></div>
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