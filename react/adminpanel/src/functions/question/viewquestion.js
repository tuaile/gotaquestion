import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { currentloginid } from '../login/loginid.js';
import { deletequestion } from '../question/deletequestion.js';
import { EditAnswer } from '../answer/editanswer.js';

export const ViewQuestionComponent = () => {
  let [state, setState] = useState([]);
  const handleViewQuestion = async () => {
    try {      
      const response = await fetch('http://localhost/gotaquestion/api/api.php?action=viewquestion', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      const result = await data;
      setState(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <ViewQuestion onClick={handleViewQuestion} />
      <div id="questions">
        <Table rows={state}>
          <DeleteButton onClick={deletequestion} />
        </Table>
      </div>
   </div>
  );
};

export function ViewQuestion({onClick}) {
    return (
        <Button onClick={onClick}>View Question</Button>
    );
}

export default ViewQuestion;

const Table = ({ rows, setIdTobeDeleted, children }) => (
  <table className="ui single line table">
    <tbody>
      {rows.map((row) => (
        <tr key={row.questionid}>
          <td>{row.question}</td>
          <td>{row.timestamp}</td>
          <td>{row.catagories}</td>
          <td>{row.answer === null ? "Not Answered" : row.answer}</td>
          <td>
            {React.cloneElement(children, { questionid: row.questionid })}
          </td>
          <td>{row.questionid}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const DeleteButton = ({ questionid, onClick }) => (
  <button
    className="ui negative basic button"
    onClick={() => onClick(questionid)}
  >Delete Question</button>
);
