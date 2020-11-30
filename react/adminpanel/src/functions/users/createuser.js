import React from 'react'
import { Message, Dropdown, Button, Header, Icon, Modal } from 'semantic-ui-react'

export function CreateUser() {
  const buttonStyle = {
  backgroundColor: '#FCD667',
  };
  const [open, setOpen] = React.useState(false)
  function handleUser() {
    var studentnumber = document.getElementById("userstudentnumber").value;
    var fullname = document.getElementById("userfullname").value;
    var password = document.getElementById("userpassword").value;
    var role = document.getElementById("role").value;
    var currentuserid = new FormData();
    currentuserid.append('studentnumber', studentnumber);
    currentuserid.append('fullname', fullname);
    currentuserid.append('password', password);
    currentuserid.append('role', role);
    fetch('https://tuaile.com/gotaquestion/api/api.php?action=createuser', {
        method: 'POST',
        body: currentuserid,
        credentials: 'include'
    })
    .then(function(response) {
      if(response.status === 202) {
        setOpen(false)
      }
      if(response.status === 411) {
        document.getElementById("createusermessage").innerHTML = "All Fields Have To Be Filled";
      }
      if(response.status === 400) {
        document.getElementById("createusermessage").innerHTML = "Student Number Has To Be Numeric";
      }
      if(response.status === 416) {
        document.getElementById("createusermessage").innerHTML = "Your Full Name Can't Be Numeric";
      }
    })
    }
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button style={buttonStyle} >Create Account</Button>}
    >
      <Header icon>
        <Icon name='user plus' />
        Create Account
      </Header>
      <Modal.Content>
        <div className="ui fluid input">
          <input id="studentnumber" type="text" id="userstudentnumber" placeholder="Student Number" />
        </div>
      <br />
        <div className="ui fluid input">
          <input id="fullname" type="text" id="userfullname" placeholder="Full Name" />
        </div>
      <br />
      <div className="ui fluid input">
        <input type="text" id="userpassword" placeholder="Password" />
      </div>
      <br/>
      <select id="role" className="ui fluid search dropdown" multiple="">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <Message warning>
          <p id="createusermessage">Create Your Account Above</p>
      </Message>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={handleUser}>
          <Icon name='checkmark' /> Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateUser