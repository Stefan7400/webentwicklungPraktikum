<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Register</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <img src="../../images/user.png" alt="user image" class="center">
    <h1 class="center">Register yourself</h1>

    <form id="form" action="friends.html" method="post">
        <fieldset>
            <legend>Register</legend>
            <label for="uname">Username</label>
            <input required id="uname" type="text" name="uname" placeholder="Username">
            <br>
            <label for="pwd">Password</label>
            <input required id="pwd" type="password" name="pwd" placeholder="Password">
            <br>
            <label for="confirm-pwd">Confirm Password</label>
            <input required id="confirm-pwd" type="password" name="confirm-pwd" placeholder="Confirm Password">
            <br>
        </fieldset>
        <div class="center">
            <a href="login.html">
                <button type="button">Cancel</button>
            </a>
            <button type="submit" class="blueButton">Create Account</button>
        </div>
    </form>
</body>

<script>
    window.chatToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSmVycnkiLCJpYXQiOjE2Njc2NzY4MTZ9.6de3Btm3Et1ZvQ1iVFNwSa_zB9XLFDXGIXfr3bxhdCo";
    window.chatCollectionId = "b91a2173-80ce-4500-9230-444f5ec567e7";
    window.chatServer = "https://online-lectures-cs.thi.de/chat";
</script>
<script src="../js/register.js" defer></script>

</html>
