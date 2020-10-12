<?php
	 class gaqsession {

        public $loginid;
        public $lastrequest;
        public $last24hours;

        public function __construct() {
            $this->lastrequest = time();
            $this->last24hours = time()-86400;
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
            $stmt = $conn->prepare("SELECT * FROM login WHERE studentnumber = :studentnumber");
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
                $this->lastrequest = time();
                return true;
            } else {
                $this->lastrequest = time();
            return false;
            } 
        }
        public function ratelimiteddailylimit() {
            // print_r($allrequests);
            // $previousrequest = $this->lastrequest == time();
            // array_push($allrequests, $previousrequest);
            // if ($allrequests > $last24hours) {
            //     unset($allrequests[$this]);
            // }
            // if (count($allrequests) > 1000) {
            //     return true;
            // } else {
            //     return false;
            // }
        }
        public function userid() {
            echo $this->loginid;
        }
    }
?>