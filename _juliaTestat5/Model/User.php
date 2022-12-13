<?php
namespace Model;

use JsonSerializable;

class User implements JsonSerializable
{
    private $username = '';

    public function getUsername()
    {
        return $this->username;
    }

    public function __construct($username = null)
    {
        $this->username = $username;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    /**
     * This method creates User-instances and assigns the right values from the JSON object
     * @param $data : processed JSON-object (to be converted to php-object)
     * @return User
     */
    public static function fromJson($data)
    {
        $user = new User("");
        foreach ($data as $key => $value) {  //key is username
            $user->{$key} = $value;
        }
        return $user;
    }
}

?>
