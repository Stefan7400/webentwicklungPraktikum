<?php
require("start.php");

if (!isset($_SESSION['user'])) {
    header('location: login.php');
    exit();
}

// for page redirect
$cancel = false;
if($cancel) {
    header('location: friends.php');
    exit();
}
//$service = new \Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
$curUser = $service->loadUser($_SESSION['user']);
//echo $curUser;
var_dump($curUser);
echo "username";
var_dump($curUser->getDescription());

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
            <input placeholder="Your name" type="text" name="firstname" value="<?= $curUser->getFirstname() ?>">
        </div>
        <div>
            <label>Last Name</label>
            <input placeholder="Your surname" type="text" name="lastname" value="<?= $curUser->getLastname() ?>">
        </div>
        <label>Coffee or Tea?</label>
        <select name="coffeOrTeaSelection" name="coffeeTea" value="<?= $curUser->getCoffeeTea() ?>">
            <option value="coffee">Coffee</option>
            <option value="tea">Tea</option>
            <option value="nor">Neither nor</option>
        </select>

    </fieldset>
    <fieldset class="long">
        <legend>Tell Something About You</legend>
        <textarea placeholder="Leave a comment" name="description" value="<?= $curUser->getDescription() ?>" ></textarea>
    </fieldset>

    <fieldset class="long">
        <legend>Preferred Chat Layout</legend>
        <div>
            <div class="flex">
                <input type="radio" id="oneLine" name="preferredChatLayout">
                <label for="oneLine">Username and message in one line</label>
            </div>
        </div>
        <div>
            <div class="flex">
                <input type="radio" id="sepLine" name="preferredChatLayout">
                <label for="sepLine">Username and message in separate line</label>
            </div>
        </div>
    </fieldset>
    <div class="center">
        <a  href="friends.php" >
            <button type="button" onclick="$cancel=true;">Cancel</button>
        </a>
        <button class="blueButton">Save</button>
    </div>
</form>
</body>

</html>
