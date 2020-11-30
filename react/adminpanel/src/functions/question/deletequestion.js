export function deletequestion(questionid) {
  var deletequestionfd = new FormData();
  deletequestionfd.append('questionid', questionid);
  fetch('https://tuaile.com/gotaquestion/api/api.php?action=deletequestion', {
      method: 'POST',
      body: deletequestionfd,
      credentials: 'include'
  })
  .then(async function(response) {
      if(response.status === 202) {
        alert("Success Question Deleted");
      } else {
        alert("Something Went Wrong Try Again");
      }
    })
}