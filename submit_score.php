<?php
    // Get the username from the request
    $username = $_COOKIE['username'];

    // Read the scores from the file
    $scores = file('scores.txt', FILE_IGNORE_NEW_LINES);


    $user_scores = array_filter($scores, function($line) use ($username) {
        return preg_match("/^$username,/", $line);
    });

    // Keep only the last 3 scores for this user
    $user_scores = array_slice($user_scores, -3);

    // Write the modified scores back to the file
    $file = fopen('scores.txt', 'w');
    foreach ($scores as $line) {
        if (!preg_match("/^$username,/", $line)) {
            fwrite($file, $line . "\n");
        }
    }
    foreach ($user_scores as $line) {
        fwrite($file, $line . "\n");
    }
    fclose($file);
?>
