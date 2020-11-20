export function deletequestion(questionid) {
  var deletequestionfd = new FormData();
  deletequestionfd.append('questionid', questionid);
  fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', {
      method: 'POST',
      body: deletequestionfd,
      credentials: 'include'
  })
}

