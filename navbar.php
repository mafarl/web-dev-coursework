<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: blue; font-size:12px; font-family:Verdana;">
  <a class="navbar-brand" href="#">PAIRS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" style="text-align:left" name="home">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" name="memory">
        <a class="nav-link" href="#">Play Pairs</a>
      </li>
      <?php if(isset($_SESSION['user_id'])){ ?>
      <li class="nav-item" name="leaderboard">
        <a class="nav-link" href="#">Leaderboard</a>
      </li>
      <?php } else { ?>
      <li class="nav-item" name="register">
        <a class="nav-link" href="#">Register</a>
      </li>
      <?php } ?>
    </ul>
  </div>
</nav>