export function currentloginid() {
    return fetch('https://tuaile.com/gotaquestion/api/api.php?action=userid', {
       method: 'GET',
       credentials: 'include'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
            var userid = JSON.parse(data);
            return userid;
        })
}