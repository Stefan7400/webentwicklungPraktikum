<?php
	require('start.php');
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Chat</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <h1>Chat with Tom</h1>

    <a href="friends.html">&lt; Back</a> | <a href="profile.html">Profile</a> | <a href="friends.html" class="remove">Remove Friend</a>

    <hr>

    <div id="chatbox" class="comBox"></div>

    <hr>

    <div class="flex">
        <input id="message" class="longType" name="message" type="text" placeholder="New Message">
        <button id="sendMessage" class="longButton">Send</button>
    </div>
</body>

</html>