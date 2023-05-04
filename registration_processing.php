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
if (!preg_match("/^[a-zA-Z0-9 ]*$/",$username)) {
    $_SESSION["error_char"] = "Invalid name";
    $error_check = true;
    header("Location: ./registration.php");
}

if (empty($skin)){
    $_SESSION["error_avatar"] = "No avatar";
    $error_check = true;
    header("Location: ./registration.php");
}
if (empty($eyes)){
    $_SESSION["error_avatar"] = "No avatar";
    $error_check = true;
    header("Location: ./registration.php");
}
if (empty($mouth)){
    $_SESSION["error_avatar"] = "No avatar";
    $error_check = true;
    header("Location: ./registration.php");
}

if (!$error_check) {
    $expiration = time() + (60 * 60);
    setcookie("username", $username, $expiration);
    setcookie("skinImage", $skin, $expiration);
    setcookie("eyesImage", $eyes, $expiration);
    setcookie("mouthImage", $mouth, $expiration);
    //$_SESSION['username'] = $username;
    //$_SESSION['skinImage'] = $skin;
    //$_SESSION['eyesImage'] = $eyes;
    //$_SESSION['mouthImage'] = $mouth;
    header("Location: ./index.php");
}