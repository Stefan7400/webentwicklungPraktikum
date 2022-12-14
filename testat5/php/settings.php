<?php
	require('start.php');
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
    <fieldset class="long">
        <legend>Base Data</legend>
        <form>
            <div>
                <label>First Name</label>
                <input placeholder="Your name">
            </div>
            <div>
                <label>Last Name</label>
                <input placeholder="Your surname">
            </div>
            <label>Coffee or Tea?</label>
            <select name="coffeOrTeaSelection">
                <option value="coffee">Coffee</option>
                <option value="tea">Tea</option>
                <option value="nor">Neither nor</option>
            </select>
        </form>
    </fieldset>
    <fieldset class="long">
        <legend>Tell Something About You</legend>
        <textarea placeholder="Leave a comment"></textarea>
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
        <a href="friends.html">
            <button class="decline">Cancel</button>
        </a>
        <button class="blueButton">Save</button>
    </div>
</body>

</html>
