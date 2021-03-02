  import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { deletequestion } from '../question/deletequestion.js';
import { deleteanswer } from '../answer/deleteanswer.js';
import { createanswer } from '../answer/createanswer.js';
import { Header, Icon, Modal } from 'semantic-ui-react'

export const ViewQuestionComponent = () => {
  let [state, setState] = useState([]);
  const [open, setOpen] = React.useState(false)
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
        <Table rows={state}>
          <DeleteButton onClick={deletequestion} />
          <DeleteAnswerButton onClick={deleteanswer} />
          <CreateAnswerButton onClick={createanswer} />
        </Table>
      </div>
      <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button>Basic Modal</Button>}
    >
      <Header icon>
        <Icon name='archive' />
        Archive Old Messages
      </Header>
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
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

const DeleteButton = ({ questionid, onClick }) => (
  <button
    className="ui negative button"
    onClick={() => onClick(questionid)}
  >Delete Question</button>
);

const DeleteAnswerButton = ({ questionid, onClick }) => (
  <button
    className="ui negative button"
    onClick={() => onClick(questionid)}
  >Delete Answer</button>
);

const CreateAnswerButton = ({ questionid, onClick }) => (
  <button
    className="ui positive button"
    onClick={() => onClick(questionid)}
  >Create Answer</button>
);
