<?php
namespace Model;	# ensures that it can be loaded correctly

use JsonSerializable;

class User implements JsonSerializable {
    private $username;
    private $firstname = '';
    private $lastname = '';
    private $coffeeTea = 0;
    private $description = '';
    private $layout = 0;

    function __construct($username=null) {
        $this->username = $username;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getFirstname() {
        return $this->firstname;
    }

    public function setFirstname($firstname) {
        $this->firstname = $firstname;
    }

    public function getLastname() {
        return $this->lastname;
    }

    public function setLastname($lastname) {
        $this->lastname = $lastname;
    }

    public function getCoffeeTea() {
        return $this->coffeeTea;
    }

    public function setCoffeeTea($coffeeTea) {
        $this->coffeeTea = $coffeeTea;
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
            $user->{$key} = $value;
        }
        return $user;
    }
}