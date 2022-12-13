<?php

namespace Utils;

use Model\Friend;
use Model\User;
use function MongoDB\BSON\toJSON;

class BackendService
{

    private $base = '';
    private $id = '';

    public function __construct($base, $id)
    {
        $this->base = $base;
        $this->id = $id;
    }

    public function test()
    {
        try {
            return HttpClient::get($this->base . '/test.json');
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function login($username, $password)
    {
        try {
            $responseHttp = HttpClient::post($this->base . '/' . $this->id . '/login', array('username' => $username, 'password' => $password));
            $_SESSION['chatToken'] = $responseHttp->token;
            return true;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function register($username, $password)
    {
        try {
            $responseHttp = HttpClient::post($this->base . '/' . $this->id . '/register', array('username' => $username, 'password' => $password));
            $_SESSION['chatToken'] = $responseHttp->token;
            return true;
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function loadUser($username)
    {
        try {
            $responseHttp = HttpClient::get($this->base . '/' . $this->id . '/user/' . $username . '/', $_SESSION["chatToken"]);
            return User::fromJson($responseHttp); // :: with static functions (doesn't need an instance to call function)
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function saveUser($user)
    {
        try {
            return HttpClient::post($this->base . '/' . $this->id . '/user/' . $user->getUsername() . '/', $user, $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function loadFriends()
    {
        try {
            $responseHttp = HttpClient::get($this->base . '/' . $this->id . '/friend/', $_SESSION["chatToken"]);
            return Friend::fromJson($responseHttp); // :: with static functions (doesn't need an instance to call function)
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function friendRequest($friend)
    {
        try {
            return HttpClient::post($this->base . '/' . $this->id . '/friend', $friend->getUsername(), $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    // dunno if these are correct, cus $friend->function(setter) dont return anything, therefore data = empty (and return is bool(flase)...)
    public function friendAccept($friend)
    {
        try {
            return HttpClient::put($this->base . '/' . $this->id . '/friend/' . $friend->getUsername(), $friend->setAccepted(), $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function friendDismiss($friend)
    {
        try {
            return HttpClient::put($this->base . '/' . $this->id . '/friend/' . $friend->getUsername(), $friend->setDismissed(), $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function friendRemove($friend)
    {
        try {
            return HttpClient::delete($this->base . '/' . $this->id . '/friend/' . $friend->getUsername(), $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function userExists($username)
    {
        try {
            return HttpClient::get($this->base . '/' . $this->id . '/user/' . $username, $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

    public function getUnread()
    {
        try {
            return HttpClient::get($this->base . '/' . $this->id . '/unread/', $_SESSION["chatToken"]);
        } catch (\Exception $e) {
            error_log($e);
        }
        return false;
    }

}