  import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { deletequestion } from '../question/deletequestion.js';
import { deleteanswer } from '../answer/deleteanswer.js';
import { createanswer } from '../answer/createanswer.js';
import { Header, Icon, Modal } from 'semantic-ui-react'

export const ViewQuestionComponent = () => {
  let [state, setState] = useState([]);
  const [open, setOpen] = React.useState(false)
  let [response, setResponse] = useState("");
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
      <div class="ui message">
      <div class="header">
        {response}
      </div>
      </div>
      <ViewQuestion onClick={handleViewQuestion} />
      <div id="questions">
        <Table rows={state}>
          <DeleteButton onClick={deletequestion} setResponse={setResponse} />
          <DeleteAnswerButton onClick={deleteanswer} setResponse={setResponse} />
          <CreateAnswerButton onClick={() => setOpen(true)} setResponse={setResponse} />
        </Table>
      </div>
      <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
    >
      <Header icon>
        <Icon name='pencil' />
        New Answer
      </Header>
      <Modal.Content>
        <div class="ui fluid input">
          <input type="text" placeholder="Search..."></input>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={createanswer} setResponse={setResponse}>
          <Icon name='checkmark' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
   </>
  );
};

export function ViewQuestion({onClick}) {
    const reloadStyle = {
      float: 'right',
      marginBottom: '1.5vh',
      backgroundColor: 'rgb(187, 134, 252)',
    };
    return (
      <>
        <Button style={reloadStyle} onClick={onClick}>Reload</Button>
      </>
    );
}

export default ViewQuestion;
const questiontable = {
  maxWidth: '97.8vw',
  marginLeft: 'auto',
  marginRight: 'auto',
}
const questionrow = {
  backgroundColor: 'rgb(230, 230, 230)',
}
const Table = ({ rows, setIdTobeDeleted, children }) => (
  <table className="ui multi line table" style={questiontable}>
    <tbody>
      {rows.map((row) => (
        <tr key={row.questionid} style={questionrow}>
          <td style={{ fontSize: '20px'}}>{row.question}</td>
          <td style={{ textAlign: 'center'}}>{row.timestamp}</td>
          <td style={{ fontSize: '17px', textAlign: 'center'}}>{row.catagories}</td>
          <td style={{ fontSize: '17px', textAlign: 'center'}}>{row.answer === null ? "Not Answered" : row.answer}</td>
          <td>
            {React.cloneElement(children[0], { questionid: row.questionid })}
          </td>
          <td>
            {React.cloneElement(children[1], { questionid: row.questionid })}
          </td>
          <td>
            {React.cloneElement(children[2], { questionid: row.questionid })}
          </td>
          <td style={{ display: 'none'}}>{row.questionid}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const DeleteButton = ({ questionid, onClick, setResponse }) => (
    <button
      className="ui negative button"
      onClick={() => onClick(questionid, setResponse)}
    >Delete Question</button>
);

const DeleteAnswerButton = ({ questionid, onClick, setResponse }) => (
  <button
    className="ui negative button"
    onClick={() => onClick(questionid, setResponse)}
  >Delete Answer</button>
);

const CreateAnswerButton = ({ questionid, onClick, setResponse }) => (
  <button
    className="ui positive button"
    onClick={() => onClick(questionid, setResponse)}
  >Create Answer</button>
);
