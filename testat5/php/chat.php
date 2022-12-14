<?php
	require('start.php');
    $service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);

    $chatPartner = "Unknown";
    $username = "Unknown";
    if(isset($_SESSION['user'])){
        $username = $_SESSION['user'];
    }
    if(isset($_GET['friend'])){
        $chatPartner = $_GET['friend'];
        $_SESSION['friend'] = $chatPartner;
    }  else {
        header('location: friends.php');
    }

    if(isset($_SESSION['friend'])){
        $chatPartner = $_SESSION['friend'];
    }

    $sendMessage = '';
    if(isset($_POST['sendMessage']) && !empty($_POST['sendMessage'])){
        //A message has been send
        $sendMessage = $_POST['sendMessage'];
        $service->sendMessage($sendMessage,$_SESSION['friend']);
        unset($_POST['sendMessage']);
        unset($_GET['input']);
        $sendMessage = "";
    }

    $user = $service->loadUser($username);
	if ($user->getLayout() === null) {
        $user->setLayout("1");
    }

if(isset($_GET['input'])) {
    $sendMessage = $_GET['input'];
}

    $messages = $service->getMessages();
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
<?php
 echo "<h1>$username's Chat with $chatPartner</h1>"
 ?>


    <a href="friends.php">&lt; Back</a> | <a href="profile.php?friend=<?php echo $chatPartner ?>">Profile</a> | <a href="friends.php?remove=<?php echo $chatPartner ?>" class="remove">Remove Friend</a>

    <hr>

    <div id="chatbox" class="comBox">

        <?php
        if($messages !== null){
            if($user->getLayout() === "0"){
                foreach ($messages as $message) {

             ?>
                    <div class="flex">
                        <div><?php echo $message->from . ": " . $message->msg?></div>
                        <div class="time"><?php echo date("d/m/Y H:i:s", $message->time / 1000)  ?></div>
                    </div>
         <?php       }
        } else {
                foreach ($messages as $message) {
                    ?>
                <div class="flex">
                    <ul class="seperatedMessage"><?php echo $message->from . ": "?>
                        <li><?php echo $message->msg?></li>
                    </ul>
                    <div class="time"><?php echo date("d/m/Y H:i:s", $message->time / 1000)  ?></div>
                </div>
            <?php   }
            }
        }
            ?>
    </div>
    <hr>
    <form method="post" action="chat.php?friend=<?php echo $chatPartner ?>">
        <div  class="flex">
            <input id="message" class="longType" name="sendMessage" value="<?= $sendMessage; ?>" type="text" placeholder="New Message">
            <button id="sendMessage" class="longButton">Send</button>
        </div>
    </form>
<script>
    window.setInterval(function() {
        let input = document.getElementById("message").value;
        if(input !== undefined && input !== null && input !== "") {
            if(location.href.indexOf("?") === -1) {
                // no query exists
                window.location = location.href += "?input=" + input;
            } else if(location.href.search("input") !== -1) {
                // input query exists
                window.location = location.href.substring(0, location.href.lastIndexOf("input=")+6) + input;
            } else {
                // only other query exists
                window.location = location.href + "&input=" + input;
            }
        } else {
            window.location = location.href;
        }
    }, 2000);

    const input = document.getElementById("message");
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
</script>
</body>

</html>