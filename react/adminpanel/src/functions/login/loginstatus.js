export function loginstatus(successCb, errorCb) {
 fetch('http://localhost/gotaquestion/api/api.php?action=loginstatus', 
    {
        method: 'GET',
        credentials: 'include'
    })
    .then(function(response) {
    if (response.status == 202) {
        successCb();         
    } else {
        errorCb();
    }
    })
 }