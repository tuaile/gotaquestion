<?php
	 class gaqsession {

        public $loginid;
        public $lastrequest;
        public $last24hours;
        public $allrequests;

        public function __construct() {
         $this->allrequests = array();
        }
	 	public function userloginstatus() {
            //Checks if loginid is set, before all base case executions and before website is loaded.
                if(isset($this->loginid)) {
                    return true;
                } else {
                    return false;
                }
        }
        public function login($studentnumber, $password) {
            $conn = dbconnection();
            $stmt = $conn->prepare("SELECT * FROM login WHERE studentnumber = :studentnumber AND status = 'active'");
            $stmt->bindParam(':studentnumber', $studentnumber);
            $stmt->execute();
            $row = $stmt->fetch();
            if (empty($password)){
                return false;
            }
            if ($password != $row['password']){
                return false;
            }
            if ($password == $row['password']) {
                return true;
            }
        }
        public function log($action) {
            $conn = dbconnection();
            try {
                $loginid = $this->loginid;
                $ip = $_SERVER['REMOTE_ADDR'];
                $browser = $_SERVER['HTTP_USER_AGENT'];
                $conn->beginTransaction();
                $stmt = $conn->prepare("INSERT INTO LOG(loginid, ip, browser, activity) VALUES(:loginid, :ip, :browser, :activity)");

                $stmt->bindValue(':loginid', $loginid);
                $stmt->bindValue(':ip', $ip);
                $stmt->bindValue(':browser', $browser);
                $stmt->bindValue(':activity', $action);

                $stmt->execute();
                $conn->commit();
        
                }
                catch (PDOException $ex) {
                    $conn->rollBack();
                throw $ex;
                }
        }
        public function loginprocess($studentnumber) {
                $conn = dbconnection();
                $stmt = $conn->prepare("SELECT loginid, studentnumber, fullname FROM login WHERE studentnumber = :studentnumber");
                $stmt->bindParam(':studentnumber', $studentnumber);
                $stmt->execute();
                $results = $stmt->fetchAll();
                $loginid = ($results[0][0]);
                $this->loginid = $loginid;
                $action = "loginsuccess";
                $this->log($action);
                $jsonresults = json_encode($results);
                return $jsonresults;
        }
        public function ratelimited() {
            if($this->lastrequest == time()) {
                //If the last request is the current time, then the user is then rate limited.
                $this->lastrequest = time();
                return true;
            } else {
                $this->lastrequest = time();
            return false;
            }
        }
        public function ratelimiteddailylimit() {
            //Finds the last 24 hours in seconds.
            $this->last24hours = time()-86400;
            //Adds the Epoch time from last request, to the All Requests array
            array_push($this->allrequests, $this->lastrequest);
            //Loops through all items in array if the time is less than the last 24 hours, remove from array
            foreach($this->allrequests as $times) {
                if ($times < $this->last24hours) {
                    $key = array_search($times, $this->allrequests);
                    array_splice($this->allrequests, $key);
                }
            }
            //After all requests are removed from array that are over 24 hours, count the array if over 1000, return true.
            if (count($this->allrequests) > 1000) {
                return true;
            } else {
                return false;
            }
        }
        public function userid() {
            echo $this->loginid;
        }
    }
?>