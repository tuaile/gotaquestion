import React from 'react'
import { Message, Button, Header, Icon, Modal } from 'semantic-ui-react'

export function Login() {
	const handleLogin = () => {
    var studentnumber = document.getElementById("studentnumber");
    var password = document.getElementById("password");
    var logindetails = new FormData();
      logindetails.append('studentnumber', studentnumber.value);
      logindetails.append('password', password.value);
      fetch('http://localhost/gotaquestion/api/api.php?action=login', {
        method: 'POST',
        body: logindetails,
        credentials: 'include'
      })
      .then(function(response) {
        if (response.status == 202) {
          var studentnumber = document.getElementById("studentnumber");
          var logindetails = new FormData();
          logindetails.append('numberofstudent', studentnumber.value);
          fetch('http://localhost/gotaquestion/api/api.php?action=processlogin', {
            method: 'POST',
            body: logindetails,
            credentials: 'include'
          })
          setOpen(false);
        }
        if (response.status == 410) {
          document.getElementById("loginmessage").innerHTML = "Please Fill All Fields";
        }
        if (response.status == 404) {
          document.getElementById("loginmessage").innerHTML = "Invalid Username Or Password";
        }
        if (response.status == 409) {
          document.getElementById("loginmessage").innerHTML = "Already Logged In, Try Again";
        }
      })
  }
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button>Login</Button>}
    >
      <Header icon>
        <Icon name='sign-in' />
        Login
      </Header>
      <Modal.Content>
        <div className="ui fluid input">
					<input type="text" id="studentnumber" placeholder="Student Number"/>
				</div>
				<br />
				<div className="ui fluid input">
					<input type="text" id="password" placeholder="Password"/> 
				</div>
        <Message warning>
          <p id="loginmessage">Please Login</p>
        </Message>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={handleLogin}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}