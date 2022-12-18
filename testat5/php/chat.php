<?php
	require('start.php');
    $service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);

    $chatPartner = "Unknown";
    $username = "";
    if(isset($_SESSION['user'])){
        $username = $_SESSION['user'];
    }
    if(isset($_GET['friend'])){
        $chatPartner = $_GET['friend'];
        $_SESSION['friend'] = $_GET['friend'];
    }

    $sendMessage = '';
    if(isset($_POST['sendMessage']) && !empty($_POST['sendMessage'])){
        //A message has been send
        $sendMessage = $_POST['sendMessage'];
        $service->sendMessage($sendMessage,$_SESSION['friend']);
        $sendMessage = '';
    }

    $data = $service->loadUser($username);
    $user = new Model\User($data->getUsername());
    if ($data->getLayout() === null) {
        $user->setLayout("1");
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


    <a href="friends.php">&lt; Back</a> | <a href="profile.php?friend=<?php echo $chatPartner ?>">Profile</a> | <a href="friends.php" class="remove">Remove Friend</a>

    <hr>

    <div id="chatbox" class="comBox"></div>

        <?php
        if($messages !== null){
            if($user->getLayout() === 0){
                foreach ($messages as $message) {

             ?>
                    <div class="flex">
                        <div><?php echo $message->from . ": " . $message->msg?></div>
                        <div class="time"><?php echo date("d/m/Y H:i:s", $message->time / 1000)  ?></div>
                    </div>
         <?php       }
        } }
            ?>

    <hr>
    <form method="post" action="chat.php">
        <div  class="flex">
            <input id="message" class="longType" name="sendMessage" type="text" placeholder="New Message">
            <button id="sendMessage" class="longButton">Send</button>
        </div>
    </form>

</body>

</html>