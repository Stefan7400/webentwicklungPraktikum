<?php
	use Utils\BackendService;

	spl_autoload_register(function($class) {
		include '../' . str_replace("\\", "/", $class) . '.php';	# loads all classes
	});
	session_start();

	define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat');
	define('CHAT_SERVER_ID', 'b91a2173-80ce-4500-9230-444f5ec567e7');

	$service = new BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);