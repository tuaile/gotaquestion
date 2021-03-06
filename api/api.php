<?php
	include 'database.php';
	include 'session.php';

	//remove top 3 to work for localhost\
	
	//ini_set('session.cookie_secure', "1");
    //ini_set('session.cookie_samesite', 'None');
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
	//header('Content-Type: application/json');
	//ini_set('session.cookie_secure','On');
	//Session starts at the start
	session_start();

	//Object is created at the start
	$functions = new gaqfunctions();
	if(!isset($_SERVER['HTTP_REFERER'])) {
		$_SERVER['HTTP_REFERER'] = 0;
	}
	//Checks if referer is the one specified if not die.
	if($_SERVER['HTTP_REFERER'] == "http://localhost/gotaquestion/" || $_SERVER['HTTP_REFERER'] == "http://192.168.1.111/" || $_SERVER['HTTP_REFERER'] == "http://192.168.43.224/" || $_SERVER['HTTP_REFERER'] == "http://localhost:3000/" || $_SERVER['HTTP_REFERER'] == "http://localhost/testing/") {
		} else {
		http_response_code(502);
		die();
	}
	//Ip whitelist
	if ($_SERVER['REMOTE_ADDR'] != "[::1]:80") {
		http_response_code(501);
	}
	//Checks if session is set, if not creates an new session.
	if(!isset($_SESSION['user_session'])) {
       $_SESSION['user_session'] = new gaqsession;
       http_response_code(501);
       die();
    }
    //If user is rate limited, die.
    if($_SESSION['user_session']->ratelimited()) {
        http_response_code(429);
        die();
    }
    //If user is daily rate limited, die.
    if ($_SESSION['user_session']->ratelimiteddailylimit()) {
    	http_response_code(429);
        die();
    }

    if(isset($_GET['action'])) {
        switch($_GET['action']) {
        case "viewquestion":
			if($_SESSION['user_session']->userloginstatus()) {
				echo $functions->viewq();
				$action = "viewquestion";
				$_SESSION['user_session']->log($action);
				http_response_code(202);
				//Accepted
			} else {
				http_response_code(401);
				//Unauthorised Access
			}
		break;

		case "viewuser":
			if($_SESSION['user_session']->userloginstatus()) {
				$userloginid = $_POST['userloginid'];
				echo $functions->viewu($userloginid);
				$action = "viewuser";
				$_SESSION['user_session']->log($action);
				http_response_code(202);
				//Accepted
			} else {
				http_response_code(401);
				//Unauthorised Access
			}
		break;

		case "viewallusers":
			if($_SESSION['user_session']->userloginstatus()) {
				echo $functions->viewallu();
				http_response_code(202);
				//Accepted
			} else {
				http_response_code(401);
				//Unauthorised Access
			}
		break;

		case "logout":
			session_destroy();
			http_response_code(202);
			//Accepted
		break;

		case "loginstatus":
			$status = $_SESSION['user_session']->userloginstatus();
            if($status == true) {
              	http_response_code(202);
              	//Still Logged In
            } 
            if ($status == false) {
                http_response_code(404);
                //Logged Out
            }
        break;

		case "login":
			if($_SESSION['user_session']->userloginstatus() == false) {
				if ($_POST['studentnumber'] == "" && $_POST['password'] == "") {
					http_response_code(410);
					//No Student Number And Or Password
				} else {
					if (is_numeric($_POST['studentnumber'])){
						$studentnumber = isset($_POST['studentnumber']) ? $_POST['studentnumber'] : 0;
						$password = isset($_POST['password']) ? $_POST['password'] : 0;
						$response = $_SESSION['user_session']->login($studentnumber, $password);
	
						if ($response == true) {
							http_response_code(202);
							//Accepted Successful Login
						} else {
							http_response_code(403);
							//Invalid Login Details
						}
					} else {
						http_response_code(403);
						//Invalid Login Details
					}
				}
			} else {
				http_response_code(409);
				//Conflict Already Logged In
			}
		break;

		case "adminlogin":
			if($_SESSION['user_session']->userloginstatus() == false) {
				if (strlen($_POST['studentnumber']) == 0 && strlen($_POST['password'] == 0)) {
					http_response_code(410);
					//No Student Number And Or Password
				} else {
					if (is_numeric($_POST['studentnumber'])){
						$studentnumber = isset($_POST['studentnumber']) ? $_POST['studentnumber'] : 0;
						$password = isset($_POST['password']) ? $_POST['password'] : 0;
						$response = $_SESSION['user_session']->adminlogin($studentnumber, $password);
	
						if ($response == true) {
							http_response_code(202);
							//Accepted Successful Login
						} else {
							http_response_code(403);
							//Invalid Login Details
						}
					} else {
						http_response_code(403);
						//Invalid Login Details
					}
				}
			} else {
				http_response_code(409);
				//Conflict Already Logged In
			}
		break;

		case "createquestion":
			if($_SESSION['user_session']->userloginstatus()) {
				if ($_POST['question'] == "") {
					http_response_code(404);
					//Question Not Found
				} else {
					$cqquestion = $_POST['question'];
					$cqcatagories = $_POST['catagories'];
					$cqloginid = $_POST['loginid'];
					$functions->createq($cqquestion, $cqcatagories, $cqloginid);
					$action = "createquestion";
					$_SESSION['user_session']->log($action);

					http_response_code(202);
					//Accepted
				}
			} else {
				http_response_code(401);
				//Unauthorised Access
			}
		break;

		case "editquestion":
			if($_SESSION['user_session']->userloginstatus()) {
				if ($_POST['questionid'] == "") {
					http_response_code(404);
				} else {
					$questionid = $_POST['questionid'];
					echo $functions->editq($questionid);
					http_response_code(202);
				}
			} else {
				http_response_code(401);
			}
		break;

		case "savequestion":
			if($_SESSION['user_session']->userloginstatus()) {
				if ($_POST['newquestion'] == "") {
					http_response_code(404);
				} else {
					$questionid = $_POST['questionidentify'];
					$newquestion = $_POST['newquestion'];
					$functions->saveq($newquestion, $questionid);
					$action = "editquestion";
					$_SESSION['user_session']->log($action);
					http_response_code(202);
				}
			} else {
				http_response_code(401);
			}
		break;

		case "deletequestion":
			if($_SESSION['user_session']->userloginstatus()) {
				if ($_POST['questionid'] == "") {
					http_response_code(404);
				} else {
					$questionid = $_POST['questionid'];
					$functions->deleteq($questionid);
					$action = "deletequestion";
					$_SESSION['user_session']->log($action);
					http_response_code(202);
				}
			} else {
				http_response_code(401);
			}
		break;

		case "createanswer":
			if($_SESSION['user_session']->userloginstatus()) {
				$questionid = $_POST['questionid'];
				$newanswer = $_POST['newanswer'];
				$functions->answerq($questionid, $newanswer);
				http_response_code(202);
			} else {
				http_response_code(401);
			}
		break;

		case "createuser":
			if($_SESSION['user_session']->userloginstatus()) {
				if ($_POST['studentnumber'] == "" || $_POST['password'] == "" || $_POST['fullname'] == "") {
					http_response_code(411);
				} else {
					if (is_numeric($_POST['fullname'])) {
						http_response_code(416);
					} else {
						if (!is_numeric($_POST['studentnumber'])) {
							http_response_code(400);
						} else {
							$studentnumber = $_POST['studentnumber'];
					 		$password = $_POST['password'];
					 		$fullname = $_POST['fullname'];
					 		$role = $_POST['role'];
							$functions->createu($studentnumber, $password, $fullname, $role);
							http_response_code(202);
						}
					}
				}
			} else {
				http_response_code(401);
			}
		break;

		case "saveuser":
			if($_SESSION['user_session']->userloginstatus()) {
				if ($_POST['studentnumber'] == "") {
					http_response_code(400);
				} else {
					if ($_POST['fullname'] == "") {
						http_response_code(411);
					} else {
						if ($_POST['password'] == "") {
							http_response_code(202);
						} else {
							if (strlen($_POST['password']) > 5) {
								if (strlen($_POST['studentnumber']) != 9) {
									http_response_code(405);
								} else {
									$studentnumber = $_POST['studentnumber'];
									$fullname = $_POST['fullname'];
									$password = $_POST['password'];
									$loginid = $_POST['loginid'];
									$functions->saveu($studentnumber, $fullname, $password, $loginid);
									$action = "edituserdetails";
									$_SESSION['user_session']->log($action);
									http_response_code(200);
								}
							} else {
								http_response_code(412);
							}
						}
					}
				}
			} else {
				http_response_code(401);
			}
		break;

		case "processlogin":
			if($_SESSION['user_session']->userloginstatus() == false) {
				$studentnumber = $_POST['numberofstudent'];
				echo $_SESSION['user_session']->loginprocess($studentnumber);
				http_response_code(202);
			} else {
				http_response_code(401);
			}
		break;

		case "userid":
			if($_SESSION['user_session']->userloginstatus() == true) {
				$_SESSION['user_session']->userid();	
				http_response_code(202);
			} else {
				http_response_code(401);
			}
		break;

		case "viewgraph":
			if($_SESSION['user_session']->userloginstatus() == true) {
				echo $functions->viewgraph();
				$action = "viewgraph";
				$_SESSION['user_session']->log($action);
				http_response_code(202);
			} else {
				http_response_code(401);
			}
		break;

		default:
			http_response_code(400);
		break;
        	}
        }
        
?>