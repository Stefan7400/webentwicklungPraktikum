<?php

require("start.php");

$user = new Model\User("nice");
$json = json_encode($user);
echo $json . "<br>";
$jsonObject = json_decode($json);
$newUser = Model\User::fromJson($jsonObject);
var_dump($newUser);

echo "<br><br>";

$friend1 = new Model\Friend("friendtester");
$friend1->setAccepted();
$json = json_encode($friend1);
echo $json . "<br>";
$jsonObject = json_decode($json);
$newUser = Model\User::fromJson($jsonObject);
var_dump($newUser);

echo "<br><br>";

$service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
var_dump($service->test());
echo "<br><br>login: ";
var_dump($service->login("Tommy", "asdfasdfa"));
echo "<br><br>register: ";
var_dump($service->register("Test1234", "idc123456789"));
echo "<br><br>loadUser: ";
var_dump($service->loadUser("Tommy"));
echo "<br><br>saveUser: ";
var_dump($service->saveUser($service->loadUser("Tommy")));
echo "<br><br>loadFriends: ";
var_dump($service->loadFriends());
echo "<br><br> friendRequest: ";
var_dump($service->friendRequest($friend1));
echo "<br><br> friendAccept: ";
var_dump($service->friendAccept($friend1));
echo "<br><br> friendDismiss: ";
var_dump($service->friendDismiss($friend1));
echo "<br><br> friendRemove: ";
var_dump($service->friendRemove($friend1));
echo "<br><br> userExists: ";
var_dump($service->userExists("notAUser"));
var_dump($service->userExists("Tom"));
echo "<br><br> getUnread: ";
var_dump($service->getUnread());

?>