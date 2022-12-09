<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no">
    <title>Login</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <header>
        <img src="../../images/chat.png" alt="chat icon" class="center">
    </header>

    <h1 class="center">Please sign in</h1>

    <form action="friends.html">
        <fieldset>
            <legend>Login</legend>
            <label for="username">Username
                <input required placeholder="Username" id="username" />
            </label><br>
            <label for="password">Password
                <input required type="password" placeholder="Password" id="password" />
            </label><br>
        </fieldset>
        <div class="center">
            <a href="../../testat2/html/register.html">
                <button type="button">Register</button>
            </a>

            <button type="submit" class="blueButton">Login</button>

        </div>
    </form>
</body>

</html>
