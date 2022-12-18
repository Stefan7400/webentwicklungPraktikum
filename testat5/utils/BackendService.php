<?php
	namespace Utils;

	use Model\User;
	use Model\Friend;

	class BackendService {
		private $base;
		private $id;

		public function __construct($base, $id) {
			$this->base = $base;
			$this->id = $id;
		}

		public function login($username, $password) {
			try {
				$data = HttpClient::post($this->base . "/" . $this->id . "/login",
											array("username" => $username, "password" => $password));
				$_SESSION['chatToken'] = $data->token;
				return true;
			} catch(\Exception $e) {
				error_log($e);
			}
			return false;
		}

		public function register($username, $password): bool {
			try {
				$data = HttpClient::post($this->base . "/" . $this->id . "/register",
											array("username" => $username, "password" => $password));
				$_SESSION['chatToken'] = $data->token; // save for subsequent calls

				if(!$this->userExists($username)) {
					return true;
				}
                unset($_SESSION['chatToken']);
			} catch(\Exception $e) {
				error_log($e);
			}

			return false;
		}

		public function loadUser($username) {
			try {
				$data = HttpClient::get($this->base . "/" . $this->id . "/user/" . $username, $_SESSION['chatToken']);
				return User::fromJson($data);
			} catch (\Exception $e) {
				error_log($e);
			}
			return null;
		}

		public function saveUser($user) {
			try {
				return HttpClient::post($this->base . "/" . $this->id . "/user/" . $user->getUsername(), $user, $_SESSION['chatToken']);
			} catch (\Exception $e) {
				error_log($e);
			}
			return false;
		}

		public function loadFriends() {
			try {
				$data = HttpClient::get($this->base . "/" . $this->id . "/friend", $_SESSION['chatToken']);
				$len = count($data);
				$friends = array();
				for($i = 0; $i < $len; $i++) {
					$friends[$i] = Friend::fromJson($data[$i]);
				}
				return $friends;
			} catch (\Exception $e) {
				error_log($e);
			}
			return null;
		}

		public function friendRequest($friend) {
			try {
				return HttpClient::post($this->base . "/" . $this->id . "/friend", $friend, $_SESSION['chatToken']);
			} catch (\Exception $e) {
				error_log($e);
			}
			return false;
		}

		public function friendAccept($friend) {
			try {
				$result = HttpClient::put($this->base . "/" . $this->id . "/friend/" . $friend->getUsername(), array("status" => "accepted"), $_SESSION['chatToken']);
				if($result) {
					$friend->setStatusAccepted();
				}
				return $result;
			} catch (\Exception $e) {
				error_log($e);
			}
			return false;
		}

		public function friendDismiss($friend) {
			try {
				$result = HttpClient::put($this->base . "/" . $this->id . "/friend/" . $friend->getUsername(), array("status" => "dismissed"), $_SESSION['chatToken']);
				if($result) {
					$friend->setStatusDismissed();
				}
				return $result;
			} catch (\Exception $e) {
				error_log($e);
			}
			return false;
		}

		public function friendRemove($friend) {
			try {
				return HttpClient::delete($this->base . "/" . $this->id . "/friend/" . $friend->getUsername(), $_SESSION['chatToken']);
			} catch (\Exception $e) {
				error_log($e);
			}
			return false;
		}

        public function stefanUserExists($username){
            try {
                $result = HttpClient::get($this->base . "/" . $this->id . "/user/" . $username);
                echo $result;
                return $result;
            }
            catch(\Exception $e) {
                return false;
            }
        }

        public function stefanRegister(string $username, string $password) {
            try {
                $result = HttpClient::post($this->base . '/' . $this->id . '/register',
                    array("username" => $username, "password" => $password));
                $_SESSION['chatToken'] = $result->token;
                return true;
            }
            catch(\Exception $e) {
                echo "Authentification failed";
            }
            return false;
        }

		public function userExists($username) {
			try {
				$result = HttpClient::get($this->base . "/" . $this->id . "/user/" . $username, $_SESSION['chatToken']);
				if(isset($result->username)) {
					return true;
				}
			} catch (\Exception $e) {
				error_log($e);
			}
			return false;
		}

		public function getUnread() {
			try {
				return (array) HttpClient::get($this->base . "/" . $this->id . "/unread", $_SESSION['chatToken']);
			} catch (\Exception $e) {
				error_log($e);
			}
			return null;
		}
	}