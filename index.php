<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Pairs!</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
  <?php 
    session_start();
    include 'navbar.php';
  ?>
  <div id="main">
    <img id="backgroundimage" src="arcade-unsplash.jpg" border="0" alt="">
    <div id="text">
      <?php if(isset($_COOKIE['username'])) { 
        echo "<h2 class='main-welcome-text'> Welcome to Pairs, " .$_COOKIE['username']. "!</h2>";
      ?>
        <br>
        <a href="pairs.php"><button type="button" class="link-on-landing">Click here to play</button></a>
      
        <?php } else { ?>
        <h2 class="main-welcome-text"> You are not using a registered session? </h2>
        <br>
        <a href="registration.php"><button type="button" class="link-on-landing">Register now</button></a>
      <?php } ?>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"></script>

</body>
</html>