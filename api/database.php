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
		public function viewgraph() {
			$conn = dbconnection();
			$stmt = $conn->prepare("SELECT COUNT(logid) AS 'Number', CAST(timestamp AS DATE) AS 'Date' FROM log WHERE timestamp > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 14 DAY) GROUP BY EXTRACT(DAY FROM timestamp)");
			$stmt->execute();
			$results = $stmt->fetchAll();
			$datevalues = [];
			foreach ($results as $row) {
				$datevalues[$row["Date"]] = $row["Number"];
			}
			$jsonresult = json_encode($datevalues);
			return $jsonresult;
		}
		public function answerq($questionid, $newanswer) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("UPDATE question SET answer = :newanswer WHERE question.questionid = :questionid");
				$stmt->bindValue(':questionid', $questionid);
				$stmt->bindValue(':newanswer', $newanswer);

				$stmt->execute();
				$conn->commit();
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
			
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
		public function createa() {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("UPDATE question SET answer = :question WHERE question.questionid = :questionid");
				$stmt->bindValue(':question', yeet);
				$stmt->bindValue(':questionid', );

				$stmt->execute();
				$results = $stmt->fetchAll();
				$jsonresult = json_encode($results);
				return $jsonresult;
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
		}
		public function saveu($studentnumber, $fullname, $password, $loginid) {
			$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("UPDATE login SET studentnumber=:studentnumber, fullname=:fullname, password=:password WHERE loginid = :loginid");
				$hashedpassword = password_hash($password, PASSWORD_DEFAULT);
				$stmt->bindValue(':studentnumber', $studentnumber);
				$stmt->bindValue(':fullname', $fullname);
				$stmt->bindValue(':password', $hashedpassword);
				$stmt->bindValue(':loginid', $loginid);

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
		public function createu($studentnumber, $password, $fullname, $role) {
			$conn = dbconnection();
			$stmt = $conn->prepare("INSERT INTO login ( studentnumber, fullname, password, role ) VALUES (:studentnumber, :fullname, :password, :role)");
			$hashedpassword = password_hash($password, PASSWORD_DEFAULT);
			$stmt->bindValue(':studentnumber', $studentnumber);
			$stmt->bindValue(':fullname', $fullname);
			$stmt->bindValue(':password', $hashedpassword);
			$stmt->bindValue(':role', $role);
			$stmt->execute();
		}
		public function viewallu() {
		$conn = dbconnection();
			try {
				$conn->beginTransaction();
				$stmt = $conn->prepare("SELECT * FROM login WHERE status = 'active'");

				$stmt->execute();
				$results = $stmt->fetchAll();
				$jsonresult = json_encode($results);
				return $jsonresult;
		
				}
				catch (PDOException $ex) {
					$conn->rollBack();
				throw $ex;
				}
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