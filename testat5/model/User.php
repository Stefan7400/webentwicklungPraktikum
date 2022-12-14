<?php
	namespace Model;	# ensures that it can be loaded correctly

	use JsonSerializable;

	class User implements JsonSerializable {
		private $username;

		function __construct($username=null) {
			$this->username = $username;
		}

		public function getUsername() {
			return $this->username;
		}

		public function jsonSerialize() {
			return get_object_vars($this);
		}

		/**
		 * deserializes JSON-object and converts it to User
		 * @param $data: JSON-object
		 * @return User
		 */
		public static function fromJson($data) {
			$user = new User();
			foreach ($data as $key => $value) {
				$user->{$key} = $value;
			}
			return $user;
		}
	}