<?php
	require('start.php');

	if(empty($_SESSION['user'])) {      // empty also checks isset
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

	$profile = false;
	if($profile) {
		header('location: profile.php');
		exit();
	}

	function displayNoFriends($friends) {
        // TODO fix
        foreach ($friends as $friend) {
            if($friend->username !== null && $friend->status !== '') {
                return false;
			}
?>
            <div>You don't have any friends</div>
<?php
            return true;
		}
	}

    function displayAcceptedFriends($service, $friends) {
		$messages = $service->getUnread();

		foreach ($friends as $friend) {
			if($friend->status === "accepted") {
				?>
                <li class="flex">
                    <a href="chat.php?friend=<?php echo $friend->username; ?>" onclick="$chat=true;">
						<?= $friend->username ?>
                    </a>
                    <div><?= $messages[$friend->username] ?></div>
                </li>
				<?php
			}
		}
	}

    function displayRequestedFriends($friends) {
        foreach ($friends as $friend) {
            if($friend->status === "requested") {
?>
                <li>
                    <a href="profile.php?name=<?php echo $friend->username; ?>" onclick="$profile=true;">
                        Friend request from <b><?= $friend->username ?></b>
                    </a>
                </li>
<?php
            }
        }
    }

	function displayFriends($service, $status) {
		$friends = $service->loadFriends();
		if(!displayNoFriends($friends)) {
            if($status === "accepted") {
                displayAcceptedFriends($service, $friends);
			} elseif($status === "requested") {
                displayRequestedFriends($friends);
			}
		}
	}

    // TODO ab addFriend
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
                displayFriends($service, "accepted");
            ?>
        </ul>
    </div>
    <hr>
    <h2>New Requests</h2>
    <ol>
		<?php
			displayFriends($service, "requested");
		?>
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
