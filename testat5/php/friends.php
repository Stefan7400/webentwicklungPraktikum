<?php
	require('start.php');

	if(empty($_SESSION['user'])) {      // empty also checks isset
        // TODO fix?
        header('location: login.php');
        exit();
	}

	$logout = false;
	if($logout) {
		header('location: logout.php');
		exit();
	}

	$chat = false;
	if($chat) {
		header('location: chat.php');
		exit();
	}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Friends</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <h1>Friends</h1>
    <p>
        <a href="logout.php" onclick="$login=true;">&lt Logout</a> | <a href="settings.php" onclick="$settings=true;">Settings</a>
    </p>
    <hr>
    <div class="comBox">
        <ul>
            <?php
                $friends = $service->loadFriends();
                $messages = $service->getUnread();

                foreach ($friends as $friend) {
                    if($friend->status == "accepted") {
            ?>
                        <li class="flex">
                            <a href="chat.php?friend=<?php echo $friend->username; ?>" onclick="$chat=true;"><?= $friend->username ?></a>
                            <div><?= $messages[$friend->username] ?></div>
                        </li>
            <?php
					}
                }
            ?>
        </ul>
    </div>
    <hr>
    <h2>New Requests</h2>
    <ol>
        <li><a href="profile.html">Friend request form <b>Track</b></a> </li>
    </ol>
    <hr>
    <form id="friendForm" autocomplete="off" onsubmit="return validateFriendForm();">
        <div class="flex">
            <input id="friendlistInput" placeholder="Add Friend to List"class="longType">
            <button id="addFriendButton" type="submit" class="longButton interact">Add</button>
        </div>
    </form>
</body>

</html>