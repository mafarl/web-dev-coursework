<?php
session_start();

$username = $_POST['username'];
$skin = $_POST['selectedOptionSkin'];
$error_check = false;

if(empty($username)) {
    $_SESSION["error_set"] = "No name";
    $error_check = true;
    header("Location: ./registration.php");
}
if (!preg_match("/^[a-zA-Z ]*$/",$username)) {
    $_SESSION["error_char"] = "Invalid name";
    $error_check = true;
    header("Location: ./registration.php");
}
if (!$error_check) {
    $_SESSION['username'] = $username;

    $_SESSION['skinAvatar'] = $skin;
    $_SESSION['eyesAvatar'] = $_POST['eyes-select'];
    $_SESSION["mouthAvatar"] = $_POST['mouth-select'];

    header("Location: ./index.php");
}
