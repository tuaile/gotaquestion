export function createanswer(questionid,newanswer) {
 	console.log(questionid);
 	console.log(newanswer);
   var editquestionfd = new FormData();
   editquestionfd.append('questionid', questionid);
   editquestionfd.append('newanswer', newanswer);
   fetch('http://localhost/gotaquestion/api/api.php?action=createanswer', {
     method: 'POST',
     body: editquestionfd,
     credentials: 'include'
    })
 }