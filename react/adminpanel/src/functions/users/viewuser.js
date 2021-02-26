import React from 'react'
import { Message, Button, Header, Icon, Modal } from 'semantic-ui-react'
import { currentloginid } from '../login/loginid.js';

export function ViewUser() {
  const buttonStyle = {
  backgroundColor: '#FCD667',
  };
  const [open, setOpen] = React.useState(false)
  async function handleUser() {
    var userloginid = await currentloginid();
    var currentuserid = new FormData();
    currentuserid.append('userloginid', userloginid);
    fetch('http://localhost/gotaquestion/api/api.php?action=viewuser', {
        method: 'POST',
        body: currentuserid,
        credentials: 'include'
    })
    .then(function(response) {
      response.json().then(function(data) {
        data.forEach(row => {
        document.getElementById("userstudentnumber").value = row.studentnumber;
        document.getElementById("userfullname").value = row.fullname;
        document.getElementById("userpassword").value = row.password;
        })
      })
    })
    
    }
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button style={buttonStyle} onClick={handleUser}>Your Account Details</Button>}
    >
      <Header icon>
        <Icon name='user' />
        Your Account Details
      </Header>
      <Modal.Content>
        <div className="ui pointing below label">
          Your Student Number
        </div>
        <div className="ui fluid input">
          <input type="text" id="userstudentnumber" placeholder="Loading..." readOnly />
        </div>
      <br />
        <div className="ui pointing below label">
          Your Full Name
        </div>
        <div className="ui fluid input">
          <input type="text" id="userfullname" placeholder="Loading..." />
        </div>
      <br />
      <div className="ui pointing below label">
          Your Encrypted Password
        </div>
      <div className="ui fluid input">
        <input type="text" id="userpassword" placeholder="Loading..." />
      </div>
      <Message warning>
          <p id="loginmessage">Single Way Encryption makes it's impossible to view your password. This is your password when encrypted.</p>
      </Message>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Exit
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> In Development
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ViewUser