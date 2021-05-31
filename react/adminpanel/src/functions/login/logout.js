import React from 'react'
import { Button } from 'semantic-ui-react'

const buttonStyle = {
  backgroundColor: '#bb86fc',
  float: 'right',
  marginTop: '.5vh',
  marginRight: '.25vw',
};
export function Logout(props) {
	const handleLogout = () => {
      fetch('https://boostmyclosing.com/api/api.php?action=logout', {
        method: 'GET',
        credentials: 'include'
      })
      .then(function(response) {
        if (response.status === 202) {
        	props.setCount("Not Logged In");
        }
      })
      
  	}
	return (
		<Button style={buttonStyle} onClick={handleLogout}>Logout</Button>
	)
}

export default Logout