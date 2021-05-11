import React from 'react'
import { Message, Button, Header, Icon, Modal } from 'semantic-ui-react'

export function ViewHelp() {
  const [open, setOpen] = React.useState(false)
  const buttonStyle = {
  	display: 'block',
  	marginLeft: 'auto',
  	marginRight: 'auto',
      backgroundColor: 'rgb(187, 134, 252)',
  };
  const textStyle = {
      textAlign: 'center',
  };
  const mainButtonStyle = {
  backgroundColor: '#bb86fc',
  float: 'right',
  marginTop: '.5vh',
  marginRight: '.25vw',
  };
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button style={mainButtonStyle} >Help</Button>}
    >
      <Header icon>
        <Icon name='question' />
        Help
      </Header>
      <Modal.Content>
		<h3 id="p" style={textStyle} >These will be the images and descriptions that will be included in the help doc to ensure that users can understand and navigate the UI of the website.</h3>
			<h5 id="p" style={textStyle} >Login button, clicking this button will open a modal where you will enter your details, when you are verified to will be granted access to other functions, within the application.</h5>
				<button style={buttonStyle} id="button" className="ui button" >Login</button>
			<br></br>
			<h5 id="p" style={textStyle} >View User, clicking this button will reveal your account details, such as your student number, full name and current password, you will also be given the option to change you details if needed.</h5>
				<button style={buttonStyle} id="button" className="ui button" >View User</button>
			<br></br>
			<h5 id="p" style={textStyle} >Logout, clicking this will log you out and prompt you to login again.</h5>
				<button style={buttonStyle} id="button" className="ui button" >Logout</button>
			<br></br>
			<h5 id="p" style={textStyle} >Create Account, as a teacher you have the privilege to create accounts for fellow teachers or for new students, the process is the exact same for both roles.</h5>
				<button style={buttonStyle} id="button" className="ui button" >Create Account</button>
			<br></br>
			<h5 id="p" style={textStyle} >View All Users, shows you all users that are registered within the systems, this includes teachers and students alike, future functionality will be added edit details and remove user accounts.</h5>
				<button style={buttonStyle} id="button"  className="ui button" >View All Users</button>
			<br></br>
			<h5 id="p" style={textStyle} >Your Account Details, shows you your current account details (First Name, Student Number & Your Password)</h5>
				<button style={buttonStyle} id="button"  className="ui button" >Your Account Details</button>
			<br></br>
			<h5 id="p" style={textStyle} >Delete Question, delete's your the current selected question.</h5>
				<button style={buttonStyle} id="button"  className="ui button" >Delete Question</button>
			<br></br>
			<h5 id="p" style={textStyle} >Delete Answer, delete's your the current selected answer.</h5>
				<button style={buttonStyle} id="button"  className="ui button" >Delete Answer</button>
			<br></br>
			<h5 id="p" style={textStyle} >Create Answer, open's a modal that will prompt you to create a new answer.</h5>
				<button style={buttonStyle} id="button"  className="ui button" >Create Answer</button>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> I Agree
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ViewHelp