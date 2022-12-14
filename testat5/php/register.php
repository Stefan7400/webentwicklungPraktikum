<?php
	require('start.php');


    function validate_username($username){
        if(empty($username) || strlen($username) < 3){
            return false;
        }

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
    if(isset($_POST['$password'])){
        $password = $_POST['$password'];
    }
    if(isset($_POST['$passwordRepeated'])){
        $passwordRepeated = $_POST['$passwordRepeated'];
    }

    if(!empty($username)) {
        echo "Username is not empty";
    } else {
        echo "Username is empty";
    }



?>

<body>
    <img src="../../images/user.png" alt="user image" class="center">
    <h1 class="center">Register yourself</h1>

    <form id="form" action="register.php" method="post">
        <fieldset>
            <legend>Register</legend>
            <label for="uname">Username</label>
            <input required id="uname" type="text" name="userName" placeholder="Username">
            <br>
            <label for="pwd">Password</label>
            <input required id="pwd" type="password" name="pwd" placeholder="Password">
            <br>
            <label for="$passwordRepeated">Confirm Password</label>
            <input required id="$passwordRepeated" type="password" name="$passwordRepeated" placeholder="Confirm Password">
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
