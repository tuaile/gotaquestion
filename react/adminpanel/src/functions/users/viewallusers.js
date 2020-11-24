import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { currentloginid } from '../login/loginid.js';
import { deletequestion } from '../question/deletequestion.js';
import { createanswer } from '../answer/createanswer.js';
import {deleteanswer } from '../answer/deleteanswer.js';

export const ViewAllUsersComponent = () => {
  let [state, setState] = useState([]);
  const handleViewQuestion = async () => {
    try {      
      const response = await fetch('http://localhost/gotaquestion/api/api.php?action=viewallusers', {
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
        </Table>
      </div>
   </div>
  );
};

export function ViewQuestion({onClick}) {
    return (
        <Button onClick={onClick}>View All Users</Button>
    );
}

export default ViewQuestion;

const Table = ({ rows, children }) => (
  <table className="ui single line table">
    <tbody>
      {rows.map((row) => (
        <tr key={row.loginid}>
          <td>Username: {row.fullname}</td>
          <td>Password: {row.password}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
