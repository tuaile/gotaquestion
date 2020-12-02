import React from 'react'
import { Button } from 'semantic-ui-react'

const buttonStyle = {
  backgroundColor: '#FCD667',
};
export function Help() {
	const handleHelp = () => {
      window.location.replace("https://tuaile.com/gotaquestion/adminpanel/help.html");
  	}
	return (
		<Button style={buttonStyle} onClick={handleHelp}>?</Button>
	)
}

export default Logout