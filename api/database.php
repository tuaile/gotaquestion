<?php
		function dbconnection() {
		$dbusername = "root";
		$dbpassword = "";
		try {
			$conn = new PDO("mysql:host=localhost;dbname=gotaquestion", $dbusername, $dbpassword);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
			return $conn;
		}
		catch(PDOException $e)
		{
			$error_message = $e->getMessage();
			?>
			<h1>Database Connection Error</h1>
			<p>There was an error connecting to the database.</p>
			<p>Error message: <?php echo $error_message;?></p>
			<?php
			exit();
		}
	}

	class gaqfunctions {
		
		private $somethings;
		private $something;

        public function __construct() {

        }
		public function createq($cqquestion, $cqcatagories, $cqloginid) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("INSERT INTO question(question, catagories, loginid)
				VALUES (:question, :catagories, :loginid)");

				$stmt->bindValue(':question', $cqquestion);
				$stmt->bindValue(':catagories', $cqcatagories);
				$stmt->bindValue(':loginid', $cqloginid);

				$stmt->execute();
				$conn->commit();
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
		}
		public function viewq() {
			$conn = dbconnection();
			$stmt = $conn->prepare("SELECT * FROM question");
			$stmt->execute();
			$results = $stmt->fetchAll();
			$jsonresult = json_encode($results);
			return $jsonresult;
		}
		public function answerq() {
			
		}
		public function deleteq($questionid) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("DELETE FROM question WHERE questionid = :questionid");
				$stmt->bindValue(':questionid', $questionid);

				$stmt->execute();
				$conn->commit();
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
		}
		public function editq($questionid) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("SELECT * FROM question WHERE questionid = :questionid");
				$stmt->bindValue(':questionid', $questionid);

				$stmt->execute();
				$conn->commit();

				$results = $stmt->fetchAll();
				$jsonresult = json_encode($results);
				return $jsonresult;
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}

		}
		public function saveq($newquestion, $questionid) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("UPDATE question SET question=:newquestion WHERE questionid = :questionid");
				$stmt->bindValue(':questionid', $questionid);
				$stmt->bindValue(':newquestion', $newquestion);

				$stmt->execute();
				$conn->commit();
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
		}
		public function edita() {
			
		}
		public function deletea() {
			
		}
		public function createa() {
			
		}
		public function deleteu() {
			
		}
		public function saveu($studentnumber, $fullname, $password) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("UPDATE login SET studentnumber=:studentnumber, fullname=:fullname, password=:password WHERE loginid = 1");
				$stmt->bindValue(':studentnumber', $studentnumber);
				$stmt->bindValue(':fullname', $fullname);
				$stmt->bindValue(':password', $password);

				$stmt->execute();
				$conn->commit();
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
		}
		public function viewu($userloginid) {
			$conn = dbconnection();
			$stmt = $conn->prepare("SELECT * FROM login WHERE loginid = :loginid");
			$stmt->bindValue(':loginid', "$userloginid");
			$stmt->execute();
			$results = $stmt->fetchAll();
			$jsonresult = json_encode($results);
			return $jsonresult;
		}
		public function viewallu() {
			
		}
		public function checklogin() {

		}
		public function userdetails($studentnumber) {
			$conn = dbconnection();
			$stmt = $conn->prepare("SELECT * FROM login WHERE studentnumber = :studentnumber");
			$stmt->bindValue(':studentnumber', "$studentnumber");
			$stmt->execute();
			$results = $stmt->fetchAll();
			$jsonresults = json_encode($results);
			return $jsonresults;
		}
    }
?>