import React from 'react'
import { Button } from 'semantic-ui-react'
import { currentloginid } from '../login/loginid.js';
//import { deletequestion } from '../question/deletequestion.js';

export function ViewQuestion() {
	function deletequestion() {
	console.log("Hi");
    fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', 
        {
            method: 'GET',
            credentials: 'include'
        }
    	)
	}
	function handleViewQuestion() {
			var out = '';
			var questions = document.getElementById("questions");
      fetch('http://localhost/gotaquestion/api/api.php?action=viewquestion', {
      	method: 'GET',
       	credentials: 'include'
      })
      .then(function(response) {
        response.json().then( async function(data) {
            var id = await currentloginid();
            data.forEach(row => {
            	var deletebutton = '<button class="ui negative basic button" onclick={deletequestion}>Delete Question</button>'
                out += '<tr><td>' + row.question +
                '</td><td>' + row.timestamp +
                '</td><td>' + row.catagories +
                '</td><td>' + (row.answer === null ? "Not Answered" : row.answer) +
                '</td><td>' + deletebutton +
                '</td></tr>';
            });
            questions.innerHTML = out;
        })
    });
  	}
	return (
		<Button onClick={handleViewQuestion}>View Question</Button>
	)
}

export default ViewQuestion