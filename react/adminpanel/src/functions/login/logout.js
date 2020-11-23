import React from 'react'
import { Button } from 'semantic-ui-react'

export function Logout() {
	const handleLogout = () => {
      fetch('http://localhost/gotaquestion/api/api.php?action=logout', {
        method: 'GET',
        credentials: 'include'
      })
  	}
	return (
		<Button onClick={handleLogout}>Logout</Button>
	)
}

export default Logout