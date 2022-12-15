<?php
	require('start.php');   # loads file, require == fatal, include == warning

	if(!empty($_SESSION['user'])) {
		header('location: friends.php');
		exit();
	}

    $register = false;
    if($register) {
		header('location: register.php');
		exit();
	}

	$username = '';
	$pwd = '';
    $error = false;
	if(isset($_POST['action']) && $_POST['action'] === 'login') {
        if(isset($_POST['username'])) {
			$username = $_POST['username'];
		}
    	if(isset($_POST['pwd'])) {
			$pwd = $_POST['pwd'];
		}

        if($service->login($username, $pwd)) {
            $_SESSION['user'] = $username;
			header('location: friends.php');
			exit();
		} else {
            $error = true;
        }
    }
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Login</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <header>
        <img src="../../images/chat.png" alt="chat icon" class="center">
    </header>

    <h1 class="center">Please sign in</h1>

    <?php
        if($error) {
    ?>
            <p class="errorHighlight">Authentication failed</p>
    <?php
        }
    ?>
    <form method="post">
        <fieldset>
            <legend>Login</legend>
            <label for="username">Username
                <input required id="username" name="username" value="<?= $username; ?>" placeholder="Username"/>
            </label><br>
            <label for="password">Password
                <input required id="password" name="pwd" value="<?= $pwd; ?>" type="password" placeholder="Password"/>
            </label><br>
        </fieldset>
        <div class="center">
            <a href="register.php">
                <button type="button" onclick="$register=true">Register</button>
            </a>
            <button type="submit" name="action" value="login" class="blueButton">Login</button>
        </div>
    </form>
</body>

</html>
