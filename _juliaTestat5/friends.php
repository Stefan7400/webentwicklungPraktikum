<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Friends</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Friends</h1>
    <p>
        <a href="logout.php">&lt Logout</a> | <a href="settings.php">Settings</a>
    </p>
    <hr>
    <div class="comBox">
        <ul>
            <li class="flex"><a href="chat.php">Tom</a><div>3</div></li>
            <li class="flex"><a href="chat.php">Marvin</a><div>1</div></li>
            <li class="flex"><a href="chat.php">Tick</a></li>
            <li class="flex"><a href="chat.php">Trick</a></li>
        </ul>
    </div>
    <hr>
    <h2>New Requests</h2>
    <ol>
        <li><a href="profile.php">Friend request form <b>Track</b></a> </li>
    </ol>
    <hr>
    <form id="friendForm" autocomplete="off" onsubmit="return validateFriendForm();"> 
        <div class="flex">
            <input id="friendlistInput" placeholder="Add Friend to List"class="longType">
            <button id="addFriendButton" type="submit" class="longButton">Add</button>
        </div>

    </form>
    <script>
        window.chatToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmVycnkiLCJpYXQiOjE2Njc2NzY4MTZ9.6de3Btm3Et1ZvQ1iVFNwSa_zB9XLFDXGIXfr3bxhdCo";
        window.chatCollectionId = "b91a2173-80ce-4500-9230-444f5ec567e7";
        window.chatServer = "https://online-lectures-cs.thi.de/chat";
    </script>
    <script src="../js/friends.js"></script>
</body>

</html>
