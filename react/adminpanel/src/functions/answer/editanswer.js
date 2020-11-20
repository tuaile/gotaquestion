import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export function EditAnswer() {
	const handleAnswer = () => {
      fetch('http://localhost/gotaquestion/api/api.php?action=editanswer', {
        method: 'POST',
        credentials: 'include'
      })
      .then(function(response) {
        response.json().then(function(data) {
        data.forEach(row => {
        document.getElementById("editanswer").value = row.answer;
        })
      })
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
      trigger={<Button>Edit Answer</Button>}
    >
      <Header icon>
        <Icon name='sign-in' />
        Edit Answer
      </Header>
      <Modal.Content>
        <div className="ui fluid input">
					<input type="text" id="editanswer" placeholder="Your Answer"/>
				</div>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)} onClick={handleAnswer}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}