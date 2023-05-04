<?php 
session_start();

$end = $_POST['end'];

$file_path = 'scores.txt';
$closed = FALSE;

// open the input file in read mode and the output file in write mode
$input_file = fopen($file_path, 'r');

// For every option
$line_number_all = 0;
$users_lines = [];

while (($line = fgets($input_file)) !== false) {
    // Split the line into level and score data
    $data = explode(',', $line);

    // Add line number to the array if it's current user's score
    if ($data[0] == $_COOKIE['username']){
        array_push($users_lines, $line_number_all);
    }

    $line_number_all++;
}

$line_number = 0;

// Submit Score
if ($end == 0){
    // Length of array that stores user's scores
    $users_array_length = count($users_lines);

    // If there're more than 3 scores (more than 1 game)
    // Delete the last 3 lines from the array (need to leave only the last game's score)
    if ($users_array_length > 3){
        array_slice($users_lines,-3);
        array_slice($users_lines,-2);
        array_slice($users_lines,-1);

        $output_file = fopen($file_path.'.tmp', 'w+');

        while (($line = fgets($input_file)) !== false) {
            if (!in_array($line_number, $users_lines)) {
                fwrite($output_file, $line);
            }
        }
        $line_number++;
    
        // close the input and output files
        fclose($input_file);
        fclose($output_file);

        $closed = TRUE;
    
        // replace the input file with the output file
        rename($file_path.'.tmp', $file_path);
    
        // delete the input file
        unlink($file_path);
    }
}

// Play Again
if ($end == 1){
    // Length of array that stores user's scores
    $users_array_length = count($users_lines);

    if ($users_array_length > 3){
        $for_counter = 0;
        for($i = $users_array_length - 1; $i >= 0; $i--){
            if ($for_counter < 3){
                unset($users_lines[$i]);
            }
            $for_counter++;
        }
    }
    
    $output_file = fopen($file_path.'.tmp', 'w+');

    while (($line = fgets($input_file)) !== false) {
        if (!in_array($line_number, $users_lines)) {
            fwrite($output_file, $line);
        }
    }
    $line_number++;
    
    // close the input and output files
    fclose($input_file);
    fclose($output_file);

    $closed = TRUE;
    
    // replace the input file with the output file
    rename($file_path.'.tmp', $file_path);
    
    // delete the input file
    unlink($file_path);
}

if ($closed == FALSE){
    fclose($input_file);
}

?>