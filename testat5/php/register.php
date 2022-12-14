<?php

use Utils\BackendService;

require('start.php');
    $service = new BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
    $errorMessages = array(
      "userNameTooShort" => "Given Username is too short!",
      "userNameAlreadyExists" => "Given Username is already in use!",
        "passwordTooShort" => "Given Password is too short",
        "passwordDoesNotMatch" => "Given Password does not match"
    );

    function validate_username(){
        if(empty($_POST['userName']) || strlen($_POST['userName']) < 3){
            return false;
        }
        //Username is ok
        return true;
    }

    function password_valid() {
        return strlen($_POST['password']) < 8;
    }

    function doPasswordMatch() {
        if(isset($_POST['password']) && isset($_POST['passwordRepeated'])){
            return strcmp($_POST['password'],$_POST['passwordRepeated']);
        }
        //Should not be called!
        return false;
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Register</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<?php
    $username = '';
    $password = '';
    $passwordRepeated = '';
    if(isset($_POST['userName'])){
        $username = $_POST['userName'];
    }
    if(isset($_POST['password'])){
        $password = $_POST['password'];
    }
    if(isset($_POST['passwordRepeated'])){
        $passwordRepeated = $_POST['passwordRepeated'];
    }

?>

<body>
    <img src="../../images/user.png" alt="user image" class="center">
    <h1 class="center">Register yourself</h1>

    <form id="form" action="register.php" method="post">
        <fieldset>
            <legend>Register</legend>
            <label for="uname">Username</label>
            <input required id="uname" type="text" value="<?= $username; ?>" name="userName" placeholder="Username">
            <?php
                if(isset($_POST['userName'])){
                    if(!validate_username()){
                        echo "<p class='errorHighlight'>Username is too short</p>";
                    } else if (!$service->register($username, $_POST['password'] ? $_POST['password'] : "")){
                        echo "<p class='errorHighlight'>Username already exists!</p> . $username";
                    }
                }
            ?>
            <br>
            <label for="password">Password</label>
            <input required id="password" type="password" name="password" placeholder="Password">
            <?php
                if(isset($_POST['password'])){
                    if(password_valid()){
                        echo "<p class='errorHighlight'>Password is too short!</p>";
                    }
                }
            ?>
            <br>
            <label for="passwordRepeated">Confirm Password</label>
            <input required id="passwordRepeated" type="password" name="passwordRepeated" placeholder="Confirm Password">
            <?php
            if(isset($_POST['password']) && isset($_POST['passwordRepeated'])){
                if(doPasswordMatch()){
                    echo "<p class='errorHighlight'>Passwords do not match!</p>";
                }
            }
            ?>
            <br>
        </fieldset>
        <div class="center">
            <a href="login.php">
                <button type="button">Cancel</button>
            </a>
            <button type="submit" class="blueButton">Create Account</button>
        </div>
    </form>
</body>

</html>
