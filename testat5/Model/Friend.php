<?php

namespace Model;

use JsonSerializable;

class Friend implements JsonSerializable
{
    private $username = '';
    private $status = '';

    public function getUsername()
    {
        return $this->username;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setAccepted()
    {
        $this->status = 'accepted';
    }

    public function setDismissed()
    {
        $this->status = 'dismissed';
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
     * @return Friend
     */
    public static function fromJson($data)
    {
        $friend = new Friend("");
        foreach ($data as $key => $value) {  //key is username
            $friend->{$key} = $value;
        }
        return $friend;
    }
}


?>
