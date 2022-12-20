<?php
	require('start.php');

	if(empty($_SESSION['user'])) {      // empty also checks isset
		header('location: login.php');
		exit();
	}

	$friends = $service->loadFriends();

    if(isset($_POST['accept'])) {
        $friend = $_POST['accept'];
        foreach ($friends as $curFriend) {
            if($curFriend->getUsername() === $friend) {
                $service->friendAccept($curFriend);
                break;
            }
        }
    }

	if(isset($_POST['decline'])) {
		$friend = $_POST['decline'];
		foreach ($friends as $curFriend) {
			if($curFriend->getUsername() === $friend) {
				$service->friendDismiss($curFriend);
				break;
			}
		}
	}

    if(isset($_GET['remove'])) {
		$friend = $_GET['remove'];
		foreach ($friends as $curFriend) {
			if($curFriend->getUsername() === $friend) {
				$service->friendRemove($curFriend);
				break;
			}
		}
    }

	function addFriend($service, $username, $friends) {
		if($_SESSION['user'] !== $username && $service->userExists($username)) {
			foreach ($friends as $friend) {
				if($username === $friend->getUsername()) {
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
    <h1>Friends of <?php echo $_SESSION['user']; ?></h1>
    <p>
        <a href="logout.php">&lt Logout</a> | <a href="settings.php">Settings</a>
    </p>
    <hr>
    <div class="comBox">
        <ul>
            <?php
				function displayNoFriends($friends): bool {
					foreach ($friends as $friend) {
						if($friend->getUsername() !== null && $friend->getStatus() === 'accepted') {
							return false;
						}
					}
            ?>
                    <div>You don't have any friends</div>
            <?php
					return true;
				}

				$messages = $service->getUnread();
				if(!displayNoFriends($friends)) {
                    foreach ($friends as $friend) {
                        if(array_key_exists($friend->getUsername(), $messages)) {
                            $message = $messages[$friend->getUsername()];
                        } else {
                            $message = 0;
                        }
                        if($friend->getStatus() === "accepted") {
            ?>
                            <li class="flex">
                                <a href="chat.php?friend=<?php echo $friend->getUsername(); ?>">
                                    <?= $friend->getUsername(); ?>
                                </a>
                                <div><?= $message ?></div>
                            </li>
            <?php
					    }
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
					if($friend->getStatus() === "requested") {
            ?>
                        <li>
                            <a href="profile.php?friend=<?php echo $friend->getUsername(); ?>">
                                Friend request from <b><?= $friend->getUsername(); ?></b>
                            </a>
                            <button name="accept" value="<?= $friend->getUsername(); ?>" type="submit" class="request interact">Accept</button>
                            <button name="decline" value="<?= $friend->getUsername(); ?>" type="submit" class="request decline">Decline</button>
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
            <input id="friendlistInput" name="username" value="<?= $username; ?>" placeholder="Add Friend to List" class="longType">
            <button id="addFriendButton" name="action" value="addFriend" type="submit" class="longButton interact">Add</button>
        </div>
    </form>

    <script>
        window.chatToken = "<?= $_SESSION['chatToken'] ?>";
        window.chatCollectionId = "<?= CHAT_SERVER_ID ?>";
        window.chatServer = "<?= CHAT_SERVER_URL ?>";

        window.setInterval(function() {
            // TODO
            // window.location.reload();
        }, 2000);
    </script>
</body>

</html>
