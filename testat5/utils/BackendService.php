<?php
	namespace Utils;

	class BackendService {
		private $base;
		private $id;

		public function __construct($base, $id) {
			$this->base = $base;
			$this->id = $id;
		}

		public function test() {
			try {
				return HttpClient::get($this->base . '/test.json');
			} catch(\Exception $e) {
				echo "Authentification failed" . $e;
			}
			return false;
		}

		public function login($username, $password) {
			try {
				$result = HttpClient::post($this->base . "/" . $this->id . "/login",
											array("username" => $username, "password" => $password));
				// $_SESSION['chatToken'] = $result->token;
				echo "login ok<br>";
				return true;
			} catch(\Exception $e) {
				echo "login error: " . $e . "<br>";
				return false;
			}
		}

		public function register($username, $password) {
			try {
				$result = HttpClient::post($this->base . "/" . $this->id . "/register",
					array("username" => $username, "password" => $password));
				//echo "Token: " . $result->token;
				$_SESSION['token'] = $result->token; // save for subsequent calls
				return true;
			} catch(\Exception $e) {
				echo "register error: " . $e . "<br>";
				return false;
			}
		}
	}