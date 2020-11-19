export function deletequestion(row) {
	console.log("Hi");
	var questionid = row;
	console.log(questionid);
    fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', 
        {
            method: 'GET',
            credentials: 'include'
        }
    	)
}