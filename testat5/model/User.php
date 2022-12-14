<?php
	namespace Model;	# ensures that it can be loaded correctly
	private $username;

	class User {
		function _construct($username=null) {
			$this->username = $username;
		}

		public function getUsername() {
			return $this->username;
		}
	}
?>