<?php
	require('start.php');

	session_unset();

	$login = false;
	if($login) {
		header('location: login.php');
		exit();
	}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Logout</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <div class="center">
    <img src="../../images/logout.png" alt="logout picture" class="center">
    <h1 class="center">Logged out...</h1>
    <p>See you!</p>
    <a href="login.php" onclick="$login=true;">Login again</a>
    </div>
</body>

</html>
