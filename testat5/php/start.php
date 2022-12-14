<?php
	spl_autoload_register(function($class) {
		include '../' . str_replace("\\", "/", $class) . '.php';	# loads all classes
	});
	session_start();

	define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat');
	define('CHAT_SERVER_ID', 'b360631c-8aea-4584-8024-e5f012ecd626');