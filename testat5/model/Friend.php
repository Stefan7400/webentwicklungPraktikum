<?php
	namespace Model;

	use JsonSerializable;

	class Friend implements JsonSerializable {
		private $username;
		private $status;

		function __construct($username=null) {
			$this->username = $username;
			$this->status = '';
		}

		public function setStatusAccepted() {
			$this->status = "accepted";
		}

		public function setStatusDismissed() {
			$this->status = "dismissed";
		}

		public function getUsername() {
			return $this->username;
		}

		public function getStatus() {
			return $this->status;
		}

		public function jsonSerialize() {
			return get_object_vars($this);
		}

		public static function fromJson($data) {
			$friend = new Friend();
			foreach ($data as $key => $value) {
				$friend->{$key} = $value;
			}
			return $friend;
		}
	}