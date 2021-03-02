export function deleteanswer(questionid) {
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
   		alert("Success Answer Deleted");
   	} else {
      alert("Something Went Wrong Try Again");
    }
   })
 }