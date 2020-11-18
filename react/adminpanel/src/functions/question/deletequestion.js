export function deletequestion() {
	console.log("Hi");
    fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', 
        {
            method: 'GET',
            credentials: 'include'
        }
    	)
}