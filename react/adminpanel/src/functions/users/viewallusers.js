import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

export const ViewAllUsersComponent = () => {
  let [state, setState] = useState([]);
  const handleViewQuestion = async () => {
    try {      
      const response = await fetch('http://localhost/gotaquestion/api/api.php?action=viewallusers', {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      setState(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <ViewQuestion onClick={handleViewQuestion} />
      <Table rows={state}>
      </Table>
   </>
  );
};

export function ViewQuestion({onClick}) {
  const buttonStyle = {
  backgroundColor: '#FCD667',
  };
    return (
        <Button style={buttonStyle} onClick={onClick}>View All Users</Button>
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
