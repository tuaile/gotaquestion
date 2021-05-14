export function deletequestion(questionid, setResponse) {
  var deletequestionfd = new FormData();
  deletequestionfd.append('questionid', questionid);
  fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', {
      method: 'POST',
      body: deletequestionfd,
      credentials: 'include'
  })
  .then(async function(response) {
      if(response.status === 202) {
        setResponse("Question Successfully Deleted");
      } else {
        setResponse("Something Went Wrong Question Deleted");
      }
    })
}