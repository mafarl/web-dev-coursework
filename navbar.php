<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: blue; font-size:12px; font-family:Verdana;">
  <a class="navbar-brand" href="#">PAIRS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" style="text-align:left" name="home">
        <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" name="memory">
        <a class="nav-link" href="pais.php">Play Pairs</a>
      </li>
      <?php 
      session_start();
      if(isset($_SESSION['username'])){ ?>
      <li class="nav-item" name="leaderboard">
        <a class="nav-link" href="leaderboard.php">Leaderboard</a>
        
      </li>
      <!--<li class="nav-item" name="avatar">
          <div class="user-avatar">
            <img class="skin-navbar" src= >
            <img class="eyes-navbar" src="emoji-assets/eyes/normal.png">
            <img class="mouth-navbar" src="emoji-assets/mouth/open.png">
          </div>
      </li> -->
      <?php } else { ?>
      <li class="nav-item" name="register">
        <a class="nav-link" href="registration.php">Register</a>
      </li>
      <?php } ?>
    </ul>
  </div>
</nav>
