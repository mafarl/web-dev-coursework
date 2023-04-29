<?php $level = $_POST['level'];
$score = $_POST['score'];

// Open the file in read mode
$fp = fopen('scores.txt', 'r');

// Initialize the best score to 0
$bestScore = 0;

// Loop through each line in the file
while (($line = fgets($fp)) !== false) {
    // Split the line into level and score data
    $data = explode(',', $line);

    // Check if the level matches the requested level
    if ($data[0] == $level) {
        // Update the best score if the score is higher than the current best score
        if ($data[1] > $score) {
            $bestScore = -1;
            break;
        }
    }

}

// Close the file
fclose($fp);

echo $bestScore; // return the best score as a response to the AJAX request

?>