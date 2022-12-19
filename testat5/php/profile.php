<?php
require('start.php');

// redirect to login if no user is set in session
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

// redirect to friends if no friend in URI
if (!isset($_GET['friend'])) {
    header('location: friends.php');
    exit();
}

$displayedFriend = $service->loadUser($_GET['friend']); // load currently displayed friend from URI-Query

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Profile</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
<h1>Profile of <?= $displayedFriend->getUsername() ?></h1>

<a href="chat.php?friend=<?php echo $displayedFriend->getUsername(); ?>">&lt; Back to Chat</a>
<label>|</label>
<a href="friends.php?remove=<?php echo $displayedFriend->getUsername() ?>" class="remove"> Remove Friend</a>
<div class=" flex">
    <img class="profile" src="../../images/profile.png" alt="profile image">
    <div class="comBox profile">
        <p>
            <?php if ($displayedFriend->getDescription() != null) echo $displayedFriend->getDescription();
            else echo "please kindly remind me to fill in my description, if you are reading this! ;)" ?>
        </p>

        <dl>
            <dt>Coffee or Tea?</dt>
            <dd> <?php if ($displayedFriend->getCoffeeOrTea() == 1) echo "Coffee";
                elseif ($displayedFriend->getCoffeeOrTea() == 2) echo "Tea";
                else echo "Neither";
                ?> </dd>

            <dt>Name</dt>
            <dd><?php if ($displayedFriend->getFirstName() != null) echo $displayedFriend->getFirstName() . " " . $displayedFriend->getLastName();
                else echo $displayedFriend->getUsername() ?></dd>
        </dl>
    </div>
</div>
</body>

</html>
