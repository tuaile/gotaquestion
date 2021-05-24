import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Header, Icon, Modal } from 'semantic-ui-react';
import { useForm } from "react-hook-form";

export const ViewQuestionComponent = () => {
  let [state, setState] = useState([]);
  const [open, setOpen] = React.useState(false)
  let [response, setResponse] = useState("");
  let [selectedQuestionId, setSelectedQuestionId] = useState(0);
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
   if (response == "Reload") {
     handleViewQuestion();
   }
  return (
    <>
      <div className="ui message">
      <div className="header">
        {response}
      </div>
      </div>
      <ViewQuestion onClick={handleViewQuestion} />
      <div id="questions">
        <Table rows={state}>
          <DeleteQuestionButton onClick={deletequestion} setResponse={setResponse} />
          <DeleteAnswerButton onClick={deleteanswer} setResponse={setResponse} />
          <CreateAnswerButton onClick={(questionid, setResponse) => {setOpen(true); setSelectedQuestionId(questionid)}} setResponse={setResponse} />
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
        <div className="ui fluid input">
          <input id="newquestiondata" type="text" placeholder="Search..."></input>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={() => { createanswer(selectedQuestionId, setResponse)}}>
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
const DeleteQuestionButton = ({ questionid, onClick, setResponse }) => (
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

function deleteanswer(questionid, setResponse) {
   var editquestionfd = new FormData();
   editquestionfd.append('questionid', questionid);
   editquestionfd.append('newanswer', "Not Answered");
   fetch('http://localhost/gotaquestion/api/api.php?action=createanswer', {
     method: 'POST',
     body: editquestionfd,
     credentials: 'include'
    })
   .then(function(response) {
    if (response.status === 202) {
      setResponse("Reload");
      setResponse("Success Answer Deleted");
    } else {
      setResponse("Something Went Wrong Try Again");
    }
   })
 }

function createanswer(questionid, setResponse) {
   var newquestiondata = document.getElementById("newquestiondata");

   var editquestionfd = new FormData();
   editquestionfd.append('questionid', questionid);
   editquestionfd.append('newanswer', newquestiondata.value);
   fetch('http://localhost/gotaquestion/api/api.php?action=createanswer', {
     method: 'POST',
     body: editquestionfd,
     credentials: 'include'
    })
   .then(function(response) {
    if (response.status === 202) {
      setResponse("Reload");
      setResponse("Success Answer Created");
    } else {
      setResponse("Something Went Wrong Try Again");
    }
   })
 }

function deletequestion(questionid, setResponse) {
  var deletequestionfd = new FormData();
  deletequestionfd.append('questionid', questionid);
  fetch('http://localhost/gotaquestion/api/api.php?action=deletequestion', {
      method: 'POST',
      body: deletequestionfd,
      credentials: 'include'
  })
  .then(async function(response) {
      if(response.status === 202) {
        setResponse("Reload");
        setResponse("Question Successfully Deleted");
      } else {
        setResponse("Something Went Wrong Question Deleted");
      }
    })
}