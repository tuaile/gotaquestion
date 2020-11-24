import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export function CreateUser() {
  const [open, setOpen] = React.useState(false)
  function handleUser() {
    var studentnumber = document.getElementById("userstudentnumber").value;
    var fullname = document.getElementById("userfullname").value;
    var password = document.getElementById("userpassword").value;
    var currentuserid = new FormData();
    currentuserid.append('studentnumber', studentnumber);
    currentuserid.append('fullname', fullname);
    currentuserid.append('password', password);
    fetch('http://localhost/gotaquestion/api/api.php?action=createuser', {
        method: 'POST',
        body: currentuserid,
        credentials: 'include'
    })
    }
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button>Create Account</Button>}
    >
      <Header icon>
        <Icon name='archive' />
        Your Details
      </Header>
      <Modal.Content>
        <div className="ui fluid input">
          <input type="text" id="userstudentnumber" placeholder="Loading..." />
        </div>
      <br />
        <div className="ui fluid input">
          <input type="text" id="userfullname" placeholder="Loading..." />
        </div>
      <br />
      <div className="ui fluid input">
        <input type="text" id="userpassword" placeholder="Loading..." />
      </div>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={handleUser}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CreateUser