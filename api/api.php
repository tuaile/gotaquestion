<?php
	include 'database.php';
	include 'session.php';

	session_start();

	header('Content-Type: application/json');
	
	$functions = new gaqfunctions();

	if($_SERVER['HTTP_REFERER'] = "http://localhost/gaq/") {
		http_response_code(200);
	} else {
		http_response_code(404);
		die();
	}
	//Checks if session is set, if not creates an new session.
	if(!isset($_SESSION['user_session'])) {
       $_SESSION['user_session'] = new gaqsession;
       http_response_code(501);
       die();
    }
    if($_SESSION['user_session']->ratelimited()) {
        http_response_code(501);
        die();
    }
    if(isset($_GET['action'])) {
        switch($_GET['action']) {
        case "viewquestion":
			if($_SESSION['user_session']->userloginstatus()) {
				echo $functions->viewq();
				$action = "viewquestion";
				$_SESSION['user_session']->log($action);
				sleep(1);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;
		case "viewuser":
			if($_SESSION['user_session']->userloginstatus()) {
				$userloginid = $_POST['userloginid'];
				echo $functions->viewu($userloginid);
				$action = "viewuser";
				$_SESSION['user_session']->log($action);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "viewallusers":
			if($_SESSION['user_session']->userloginstatus()) {
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "logout":
			session_destroy();
			http_response_code(206);
		break;

		case "loginstatus":
			$status = $_SESSION['user_session']->userloginstatus();
                if($status == true) {
                    http_response_code(206);
                } else {
                    http_response_code(404);
                }
        break;

		case "login":
			if($_SESSION['user_session']->userloginstatus() == false) {
				$studentnumber = isset($_POST['studentnumber']) ? $_POST['studentnumber'] : 0;
				$password = isset($_POST['password']) ? $_POST['password'] : 0;
				$response = $_SESSION['user_session']->login($studentnumber, $password);
				sleep(1);
				http_response_code(206);
				if ($response == true) {
					http_response_code(202);
				} else {
					http_response_code(404);
				}
			} else {
				http_response_code(401);
			}
		break;

		case "createquestion":
			if($_SESSION['user_session']->userloginstatus()) {
				$cqquestion = $_POST['question'];
				$cqcatagories = $_POST['catagories'];
				$cqloginid = $_POST['loginid'];
				print_r($cqloginid);
				$functions->createq($cqquestion, $cqcatagories, $cqloginid);
				$action = "createquestion";
				$_SESSION['user_session']->log($action);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "editquestion":
			if($_SESSION['user_session']->userloginstatus()) {
				$questionid = $_POST['questionid'];;
				echo $functions->editq($questionid);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "savequestion":
			if($_SESSION['user_session']->userloginstatus()) {
				$questionid = $_POST['questionidentify'];
				$newquestion = $_POST['newquestion'];
				$functions->saveq($newquestion, $questionid);
				$action = "editquestion";
				$_SESSION['user_session']->log($action);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "deletequestion":
			if($_SESSION['user_session']->userloginstatus()) {
				$questionid = $_POST['questionid'];
				$functions->deleteq($questionid);
				$action = "deletequestion";
				$_SESSION['user_session']->log($action);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "createanswer":
			if($_SESSION['user_session']->userloginstatus()) {
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "editanswer":
			if($_SESSION['user_session']->userloginstatus()) {
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "deleteanswer":
			if($_SESSION['user_session']->userloginstatus()) {
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "createuser":
			if($_SESSION['user_session']->userloginstatus()) {
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "saveuser":
			if($_SESSION['user_session']->userloginstatus()) {
				$studentnumber = $_POST['studentnumber'];
				$fullname = $_POST['fullname'];
				$password = $_POST['password'];
				$functions->saveu($studentnumber, $fullname, $password);
				$action = "edituserdetails";
				$_SESSION['user_session']->log($action);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "deleteuser":
			if($_SESSION['user_session']->userloginstatus()) {
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "processlogin":
			if($_SESSION['user_session']->userloginstatus() == false) {
				$studentnumber = $_POST['numberofstudent'];
				$_SESSION['user_session']->loginprocess($studentnumber);
				sleep(1);
				http_response_code(206);
			} else {
				http_response_code(401);
			}
		break;

		case "userid":
			if($_SESSION['user_session']->userloginstatus() == true) {
				$_SESSION['user_session']->userid();
				sleep(1);	
				http_response_code(206);
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