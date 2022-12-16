<?php
namespace Model;	# ensures that it can be loaded correctly

use JsonSerializable;

class User implements JsonSerializable {
    private $username;
    private $firstName = '';
    private $lastName = '';
    private $coffeeOrTea = 0;
    private $description = '';
    private $layout = 0;

    function __construct($username=null) {
        $this->username = $username;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getFirstName() {
        return $this->firstName;
    }

    public function setFirstName($firstName) {
        $this->firstName = $firstName;
    }

    public function getLastName() {
        return $this->lastName;
    }

    public function setLastName($lastName) {
        $this->lastName = $lastName;
    }

    public function getCoffeeOrTea() {
        return $this->coffeeOrTea;
    }

    public function setCoffeeOrTea($coffeeOrTea) {
        $this->coffeeOrTea = $coffeeOrTea;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getLayout() {
        return $this->layout;
    }

    public function setLayout($layout) {
        $this->layout = $layout;
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
            //echo "in USER fromJason: <br><br>";
            // var_dump($user);
            $user->{$key} = $value;
        }
        return $user;
    }
}