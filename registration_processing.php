<?php
session_start();

$username = $_POST['username'];

$skin = $_POST['skin-select-name'];
$eyes = $_POST['eyes-select-name'];
$mouth = $_POST['mouth-select-name'];

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
    $_SESSION['eyesAvatar'] = $eyes
    $_SESSION["mouthAvatar"] = $mouth;

    header("Location: ./index.php");
}
