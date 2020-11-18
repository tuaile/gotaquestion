import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { currentloginid } from '../login/loginid.js';
//import { deletequestion } from '../question/deletequestion.js';

// App component just as an example
export const ViewQuestion = () => {
  let [state, setState] = useState([]);
  const handleViewQuestion = async () => {
    try {      
      const response = await fetch('http://localhost/gotaquestion/api/api.php?action=viewquestion', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      const result = await data;
      // const id = await currentloginid(); // I didn't see where you use this id
      setState(data);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteQuestion = () => {
    fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', 
     {
       method: 'GET',
       credentials: 'include'
     });
   };

  return (
    <div>
      <ViewQuestion onClick={handleViewQuestion} />
      <div id="questions">
        <Table rows={state}>
          <DeleteButton onClick={deleteQuestion} />
        </Table>
      </div>
   </div>
  );
};

export function ViewQuestionButton({onClick}) {
    return (
        <Button onClick={onClick}>View Question</Button>
    );
}

export default ViewQuestionButton;

const Table = ({rows, children}) => (
  <>
   { rows.map(row =>
     <tr key={row.questionid}> // you must use an id for each child in a list
      <td>{row.question}</td>
      <td>{row.timestamp}</td>
      <td>{row.catagories}</td>
      <td>{(row.answer === null ? "Not Answered" : row.answer)}</td>
      <td>{children}</td>
     </tr>
    )}
  </>
);

const DeleteButton = ({onClick}) => (
  <button className="ui negative basic button" onClick={onClick}>Delete Question</button>
);