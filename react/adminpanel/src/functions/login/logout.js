import React from 'react'
import { Button } from 'semantic-ui-react'

const buttonStyle = {
  backgroundColor: '#FCD667',
};
export function Logout(props) {
	const handleLogout = () => {
      fetch('http://localhost/gotaquestion/api/api.php?action=logout', {
        method: 'GET',
        credentials: 'include'
      })
      .then(function(response) {
        if (response.status == 202) {
        	props.setCount("Not Logged In");
        }
      })
      
  	}
	return (
		<Button style={buttonStyle} onClick={handleLogout}>Logout</Button>
	)
}

export default Logout