export function loginstatus() {
    fetch('http://localhost/gotaquestion/api/api.php?action=loginstatus', 
        {
            method: 'GET',
            credentials: 'include'
        })
        .then(function(response) {
        if (response.status == 404) {
            localStorage.setItem('Status', 'NLI');          
        } else {
            localStorage.setItem('Status', 'LI');
        }
        })
}