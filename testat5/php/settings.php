<?php
require("start.php");

// redirect to login if no user is set in session
if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

$curUser = $service->loadUser($_SESSION['user']);

// page redirect
$cancel = false;
if ($cancel) {
    header('location: friends.php');
    exit();
}

// saving user data after hitting "save" button
if ($_POST != null) {

    $curUser->setFirstName($_POST['firstName']);
    $curUser->setLastName($_POST['lastName']);
    $curUser->setCoffeeOrTea($_POST['coffeeOrTea']);
    $curUser->setDescription($_POST['description']);
    $curUser->setLayout($_POST['layout']);

    $service->saveUser($curUser);
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Settings</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
<h1>Profile Settings</h1>
<form action="settings.php" method="post">
    <fieldset class="long">
        <legend>Base Data</legend>

        <div>
            <label>First Name</label>
            <input placeholder="Your name" type="text" name="firstName" value="<?= $curUser->getFirstName() ?>">
        </div>
        <div>
            <label>Last Name</label>
            <input placeholder="Your surname" type="text" name="lastName" value="<?= $curUser->getLastName() ?>">
        </div>
        <label>Coffee or Tea?</label>
        <select name="coffeeOrTea" name="coffeeOrTea">
            <option value="1" <?php if($curUser->getCoffeeOrTea() == 1): ?> selected="selected" <?php endif; ?>>Coffee</option>
            <option value="2" <?php if($curUser->getCoffeeOrTea() == 2): ?> selected="selected" <?php endif; ?>>Tea</option>
            <option value="0" <?php if($curUser->getCoffeeOrTea() == 0): ?> selected="selected" <?php endif; ?>>Neither nor</option>
        </select>

    </fieldset>
    <fieldset class="long">
        <legend>Tell Something About You</legend>
        <textarea placeholder="Leave a comment" name="description" ><?= $curUser->getDescription()?></textarea>
    </fieldset>

    <fieldset class="long">
        <legend>Preferred Chat Layout</legend>
        <div>
            <div class="flex">
                <input type="radio" id="oneLine" name="layout" value="0" <?php if($curUser->getLayout() === "0"): ?> checked="checked" <?php endif; ?>>
                <label for="oneLine">Username and message in one line</label>
            </div>
        </div>
        <div>
            <div class="flex">
                <input type="radio" id="sepLine" name="layout" value="1" <?php if($curUser->getLayout() === "1"): ?> checked="checked" <?php endif; ?>>
                <label for="sepLine">Username and message in separate line</label>
            </div>
        </div>
    </fieldset>
    <div class="center">
        <a href="friends.php">
            <button type="button" onclick="$cancel=true;">Cancel</button>
        </a>
        <button class="blueButton">Save</button>
    </div>
</form>
</body>

</html>
