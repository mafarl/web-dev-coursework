<?php
    $deleted = false;
    $file = 'scores.txt';
    $username = $_COOKIE['username'];

    // Read the scores from the file
    $scores = file('scores.txt', FILE_IGNORE_NEW_LINES);

    // Filter out the scores for the given username
    $user_scores = array_filter($scores, function($line) use ($username) {
        return preg_match("/^$username,/", $line);
    });

    if (count($user_scores) % 3 == 0){
        // Remove the last 3 scores for this user
        $count = count($user_scores);
        if ($count > 0) {
            $user_scores = array_reverse($user_scores);
            $user_scores = array_slice($user_scores, 3);
            $user_scores = array_reverse($user_scores);
            $deleted = true;
        }
    } 
    
    if (!$deleted){
        if ((count($user_scores) + 1) % 3 == 0){
            $count = count($user_scores);
            if ($count > 0) {
                $user_scores = array_reverse($user_scores);
                $user_scores = array_slice($user_scores, 2);
                $user_scores = array_reverse($user_scores);
                $deleted = true;
            }
        } else if ((count($user_scores) + 2) % 3 == 0){
            $count = count($user_scores);
            if ($count > 0) {
                $user_scores = array_reverse($user_scores);
                $user_scores = array_slice($user_scores, 1);
                $user_scores = array_reverse($user_scores);
                $deleted = true;
            }
        }
    }

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
