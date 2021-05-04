export function createanswer(questionid, setResponse) {
   var editquestionfd = new FormData();
   editquestionfd.append('questionid', questionid);
   editquestionfd.append('newanswer', "");
   fetch('http://localhost/gotaquestion/api/api.php?action=createanswer', {
     method: 'POST',
     body: editquestionfd,
     credentials: 'include'
    })
   .then(function(response) {
    if (response.status === 202) {
      setResponse("Success Answer Created")
    } else {
      setResponse("Something Went Wrong Try Again")
    }
   })
 }