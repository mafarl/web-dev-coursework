<?php 
session_start();

$level = $_POST['level'];
$score = $_POST['score'];

touch("scores.txt");
chmod('scores.txt', 0666);

if (isset($_COOKIE['username'])){
    // Open the file in append mode
    $fp = fopen('scores.txt', 'a');

    if (flock($fp, LOCK_SH)) {
        // Write the score data to the file
        if ($level == 1){
            // Write the score data to the file
            fwrite($fp, $_COOKIE['username'] . ',' . $level . ',' . $score . ',' . $_COOKIE['skinImage'] . ',' . $_COOKIE['eyesImage'] . ',' . $_COOKIE['mouthImage'] . PHP_EOL);
        } else {
            fwrite($fp, $_COOKIE['username'] . ',' . $level . ',' . $score . PHP_EOL);
        }

        flock($fp, LOCK_UN); // release the lock
    } else {
        // handle the error
    }
    
    // Close the file
    fclose($fp);
}

echo $score;

?>