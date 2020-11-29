import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { deletequestion } from '../question/deletequestion.js';
import { createanswer } from '../answer/createanswer.js';
import { deleteanswer } from '../answer/deleteanswer.js';

export const ViewQuestionComponent = () => {
  const answersBox = {
      marginLeft: '41vw',
    };
  let [state, setState] = useState([]);
  useEffect(() => {
  handleViewQuestion();
  }, []);
  const handleViewQuestion = async () => {
    try {      
      const response = await fetch('http://localhost/gotaquestion/api/api.php?action=viewquestion', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      const result = await data;
      setState(result);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <ViewQuestion onClick={handleViewQuestion} />
      <div id="questions">
        <div className="ui input">
          <input id="nq" style={answersBox} type="text" placeholder="Create New Answer"/>
        </div>
        <Table rows={state}>
          <DeleteButton onClick={deletequestion} />
          <CreateNewAnswerButton onClick={createanswer} />
          <DeleteAnswerButton onClick={deleteanswer} />
        </Table>
      </div>
   </>
  );
};

export function ViewQuestion({onClick}) {
    const reloadStyle = {
      marginLeft: '95vw',
    };
    return (
      <>
        <Icon style={reloadStyle} onClick={onClick} name='undo' />
      </>
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
            {React.cloneElement(children[0], { questionid: row.questionid })}
          </td>
          <td>
            {React.cloneElement(children[1], { newanswer: document.getElementById("nq").value, questionid: row.questionid })}
          </td>
          <td>
            {React.cloneElement(children[2], { questionid: row.questionid })}
          </td>
          <td>{row.questionid}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const CreateNewAnswerButton = ({ questionid, newanswer, onClick }) => (
  <button
    className="ui negative basic button"
    onClick={() => onClick(questionid, newanswer)}
  >Create New Answer</button>
);

const DeleteButton = ({ questionid, onClick }) => (
  <button
    className="ui negative basic button"
    onClick={() => onClick(questionid)}
  >Delete Question</button>
);

const DeleteAnswerButton = ({ questionid, onClick }) => (
  <button
    className="ui negative basic button"
    onClick={() => onClick(questionid)}
  >Delete Answer</button>
);
