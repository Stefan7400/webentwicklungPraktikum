<?php
	require("start.php");

	$service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
	var_dump($service->test());
	echo "<br><br>login: ";
	var_dump($service->login("Tommy", "asdfasdfa"));
	echo "<br><br>register: ";
	var_dump($service->register("Test1234", "idc123456789"));