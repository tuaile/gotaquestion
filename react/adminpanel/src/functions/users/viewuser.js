import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export function ViewUser() {
  const [open, setOpen] = React.useState(false)
  const handleUser = () => {
    var userloginid = 2;
    var currentuserid = new FormData();
    currentuserid.append('userloginid', userloginid);
    fetch('http://localhost/gotaquestion/api/api.php?action=viewuser', {
        method: 'POST',
        body: currentuserid,
        credentials: 'include'
    })
    .then(function(data) {
      console.log(data);
    })
    }
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button>View User</Button>}
    >
      <Header icon>
        <Icon name='archive' />
        Your Details
      </Header>
      <Modal.Content>
        <div className="ui fluid input">
          <input type="text" id="userstudentnumber" placeholder="Loading..." readOnly />
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
        <Button color='green' inverted onClick={() => setOpen(false)} onClick={handleUser}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ViewUser