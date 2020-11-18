export function loginstatus() {
    fetch('http://localhost/gotaquestion/api/api.php?action=loginstatus', 
        {
            method: 'GET',
            credentials: 'include'
        }
    	)
}