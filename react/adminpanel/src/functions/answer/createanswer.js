 export function createanswer(questionid) {
   var editquestionfd = new FormData();
   editquestionfd.append('questionid', questionid);
   fetch('http://localhost/gotaquestion/api/api.php?action=editquestion', {
     method: 'POST',
     body: editquestionfd,
     credentials: 'include'
    })
   .then(response => response.json())
   .then(data => console.log(data));
 }