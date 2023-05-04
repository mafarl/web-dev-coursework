<?php
  // Start the session
  session_start();
  include 'navbar.php'; 

  if (isset($_POST['level_scores'])) {
    $unsplit = $_POST['level_scores'];
    $scores_array = explode(",", $unsplit);

    // set a cookie to store the session ID
    setcookie('PHPSESSID', session_id(), time() + 3600);

    // check if the 'submissions' array exists in the session, if not, create it
    if (!isset($_SESSION['submissions'])) {
      $_SESSION['submissions'] = array();
    }

    // check if the 'avatars' array exists in the session
    // it will store username => array of avatar images
    if (!isset($_SESSION['avatars'])) {
      $_SESSION['avatars'] = array();
    }

    // store user submissions in the session
    $_SESSION['submissions'][$_COOKIE['username']] = $scores_array;

    // store images chosen by a user
    $_SESSION['avatars'][$_COOKIE['username']] = array($_COOKIE['skinImage'], $_COOKIE['eyesImage'], $_COOKIE['mouthImage']);
  } 


  // Display the leaderboard table
?>
<!DOCTYPE html>
<html>
<head>
  <title>Leaderboard</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <style>
    .leaderboard {
      box-shadow: 5px 5px 5px #888888;
      padding: 20px;
    }
    
    table {
      border-collapse: collapse;
      border-spacing: 2px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }
    
    th {
      background-color: blue;
      color: white;
      font-weight: bold;
    }

    td {
      background-color: #f2f2f2;
    }
    
    td, th {
      padding: 10px;
      text-align: center;
      border: 1px solid black;
    }

    h2 {
      color: #f2f2f2;
    }

    #wrapper-leaderboard{
      background-color: grey;
      border-radius: 5px;
      border: solid 2px #8a826d;
      padding: 20px;
      width: 80%;
      margin: auto;
      margin-top: 50px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      box-shadow: 5px 5px 5px blue;;  
    }

    #links-wrapper{
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }

    .skin-leaderboard{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 30px;
    }

    .eyes-leaderboard{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 3;
      width: 30px;
    }

    .mouth-leaderboard{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      width: 30px;
    }
  </style>
</head>
<body>
  <div id="main" class="leaderboard">
    <img id="backgroundimage" src="background.jpg" border="0" alt="">

    <div id="wrapper-leaderboard">
      <h2 id="registration-h2">Leaderboard</h2>

      <div id="links-wrapper">
        <a href="leaderboard.php?level=1" class="link-on-landing">Sort by Level 1</a>
        <a href="leaderboard.php?level=2" class="link-on-landing">Sort by Level 2</a>
        <a href="leaderboard.php?level=3" class="link-on-landing">Sort by Level 3</a>
        <a href="leaderboard.php?level=0" class="link-on-landing">Sort by Total Scores</a>
     </div>

      <table>
        <thead>
          <tr>
            <th>Place</th>
            <!-- For avatar -->
            <th> </th>
            <th>Username</th>
            <th>Level 1 Score</th>
            <th>Level 2 Score</th>
            <th>Level 3 Score</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          <?php
              // Sort the array here and then print out one by one
              $level = $_GET['level'] ?? null;
              if ($level === null) {
                // Display error message or redirect to homepage
                exit;
              }
              
              if ($level == 0){
                  
                  $sums = array();
                  foreach ($_SESSION['submissions'] as $username => $scores) {
                      $sums[$username] = array_sum($scores);
                      
                  }
                  array_multisort($sums, SORT_DESC, $_SESSION['submissions']);

              } else {
                  $sc = array_column($_SESSION['submissions'], ($level - 1));
                  array_multisort($sc, SORT_DESC, $_SESSION['submissions']);
              }
              


              // Will be printed out with all the results seen but sorted according to the specific level
              $i = 1;
              // Loop through the leaderboard data and display each user's scores
              foreach ($_SESSION['submissions'] as $username => $scores) {
              echo '<tr>';
              echo '<td>' . $i . '</td>'; 
              echo '<td style="position: relative; padding: 20px;">'; ?>

              <img class="skin-leaderboard" src="<?php echo $_SESSION['avatars'][$username][0]; ?>">
              <img class="eyes-leaderboard" src="<?php echo $_SESSION['avatars'][$username][1]; ?>">
              <img class="mouth-leaderboard" src="<?php echo $_SESSION['avatars'][$username][2]; ?>"> 

              <?php echo '</td>';
              echo '<td>' . $username . '</td>';
              echo '<td>' . $scores[0] . '</td>';
              echo '<td>' . $scores[1] . '</td>';
              echo '<td>' . $scores[2] . '</td>';
              $totalscore = $scores[0] + $scores[1] + $scores[2];
              echo '<td>' . $totalscore . '</td>';
              echo '</tr>';
              $i = $i + 1;
              }
          ?>
          </tbody>
      </table>
    </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js"></script>

</body>
</html>