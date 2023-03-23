<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php 
        session_start();
        include 'navbar.php'; 
    ?>
    <div id="main"> 
        <img id="backgroundimage" src="background.jpg" border="0" alt="">
        <div class="data-entry">
            <form method="POST" action="./registration_processing.php">
                <h2 id="registration-h2">Registration</h2>
                <div class="username-entry" title="Shouldn't contain !@#%&*()+=^{}[]—;:“'<>?/">
                    <span>Username:</span>
                    <!-- In case there's an error with username - print something inside username input -->
                    <?php if(isset($_SESSION["error_set"])) { ?>
                        <input type="text" name="username" placeholder="Name not set">
                    <?php } else if (isset($_SESSION["error_char"])) { ?>
                        <input type="text" name="username" placeholder="Names only contain letters and whitespace">
                    <?php } else {?>
                        <input type="text" name="username" placeholder="Username">
                    <?php } ?>
                </div>
                <div class="avatar-entry">
                    <p>Choose avatar:</p>
                    <!-- Dropdown options for avatar -->
                    <div class="dropdowns">
                        <select class="dropdown-content skin-select" name="skin-select-name">
                            <option value="">Select skin</option>
                        </select>
                        <select class="dropdown-content eyes-select" name="eyes-select-name">
                            <option value="">Select eyes</option>
                        </select>
                        <select class="dropdown-content mouth-select" name="mouth-select-name">
                            <option value="">Select mouth</option>
                        </select>
                    </div>
                    <!-- Displaying default avatar -->
                    <div class="avatar-container">
                        <img class="skin" src="emoji-assets/skin/yellow.png">
                        <img class="eyes" src="emoji-assets/eyes/rolling.png">
                        <img class="mouth" src="emoji-assets/mouth/sad.png">
                    </div>
                </div>

                <br>
                <div class="button-entry">
                    <input type="submit" value="Submit" name="submit-button">
                </div>
            </form>
        </div>
    </div>
    <script src="avatar.js"></script>
</body>
</html>

<?php
    unset($_SESSION["error_set"]);
    unset($_SESSION["error_char"]);
?>
