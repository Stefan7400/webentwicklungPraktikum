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

	$friends = $service->loadFriends();

    // TODO change everything from $friend->status and ->username to getStatus() and getUsername()

    if(isset($_POST['accept'])) {
        $friend = $_POST['accept'];
#        $friend->setStatusAccepted();
        // TODO
    }

	if(isset($_POST['decline'])) {
		$friend = $_POST['decline'];
#        $friend->setStatusDismissed();
        // TODO
	}

	// TODO react to deleted friends

    // add friend

    function addFriend($service, $username, $friends) {
		if($_SESSION['user'] !== $username && $service->userExists($username)) {
			foreach ($friends as $friend) {
				if($username === $friend->username) {
					return false;
				}
			}
			return $service->friendRequest($service->loadUser($username));
		}
        return false;
    }

	$username = '';
    $error = false;
    if(isset($_POST['action']) && $_POST['action'] === 'addFriend') {
        if(isset($_POST['username'])) {
            $username = $_POST['username'];
        }
        $error = !addFriend($service, $username, $friends);
        if(!$error) {
            $username = '';
        }
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
				function displayNoFriends($friends): bool {
					foreach ($friends as $friend) {
						if($friend->username !== null && $friend->status === 'accepted') {
							return false;
						}
					}
            ?>
                    <div>You don't have any friends</div>
            <?php
					return true;
				}

				$messages = $service->getUnread();
				if(displayNoFriends($friends)) {
					return;
				}

				foreach ($friends as $friend) {
					if(array_key_exists($friend->username, $messages)) {
						$message = $messages[$friend->username];
					} else {
						$message = 0;
					}
					if($friend->status === "accepted") {
            ?>
                        <li class="flex">
                            <a href="chat.php?friend=<?php echo $friend->username; ?>" onclick="$chat=true;">
								<?= $friend->username; ?>
                            </a>
                            <div><?= $message ?></div>
                        </li>
            <?php
					}
				}
			?>
        </ul>
    </div>
    <hr>
    <h2>New Requests</h2>
    <form action="friends.php" method="post">
        <ol>
            <?php
				foreach ($friends as $friend) {
					if($friend->status === "requested") {
            ?>
                        <li>
                            <a href="profile.php?name=<?php echo $friend->username; ?>" onclick="$profile=true;">
                                Friend request from <b><?= $friend->username; ?></b>
                            </a>
                            <button name="accept" value="<?= $friend->username; ?>" type="submit" class="request interact">Accept</button>
                            <button name="decline" value="<?= $friend->username; ?>" type="submit" class="request decline">Decline</button>
                        </li>
            <?php
					}
				}
            ?>
        </ol>
    </form>
    <hr>
	<?php
		if($error) {
    ?>
            <p class="errorHighlight">invalid input</p>
    <?php
		}
	?>
    <form action="friends.php" method="post">
        <div class="flex">
            <input id="friendlistInput" name="username" value="<?= $username; ?>" placeholder="Add Friend to List"class="longType">
            <button id="addFriendButton" name="action" value="addFriend" type="submit" class="longButton interact">Add</button>
        </div>
    </form>

    <script>
        window.chatToken = "<?= $_SESSION['chatToken'] ?>";
        window.chatCollectionId = "<?= CHAT_SERVER_ID ?>";
        window.chatServer = "<?= CHAT_SERVER_URL ?>";

        window.setInterval(function() {
            // TODO interval works but doesn't refresh the stuff yet
            window.location.href;
        }, 2000);
    </script>
</body>

</html>
