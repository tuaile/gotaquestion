import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';  

const StyledButton = styled.button`
  background-color: ${props => props.bgColor};
  &:hover {
      color: red;
  }
`
;
const ButtonExampleButton = (props) => <Button {...props}>Click Here</Button>;
export const Login = () => {
  const handleLogin = () => {
    var studentnumber = 470842368;
    var password = 123456;
    var logindetails = new FormData();
    logindetails.append('studentnumber', studentnumber);
    logindetails.append('password', password);
    fetch('http://localhost/gotaquestion/api/api.php?action=login', {
      method: 'POST',
      body: logindetails,
      credentials: 'include'
    })
  }
  const handleProcess = () => {
    var studentnumber = 470842368;
            var logindetails = new FormData();
            logindetails.append('numberofstudent', studentnumber);
            fetch('http://localhost/gotaquestion/api/api.php?action=processlogin', {
            method: 'POST',
            body: logindetails,
            credentials: 'include'
            })
  }
  const handleQuestion = () => {
            fetch('http://localhost/gotaquestion/api/api.php?action=viewquestion', {
            method: 'GET',
            credentials: 'include'
            })
            .then(function(data) {
              console.log(data);
            })
}
  
  return (
    <>
    <StyledButton bgColor="#000000" onClick={handleLogin}>Login</StyledButton>
    <FontAwesomeIcon icon={faCoffee} />
    <ButtonExampleButton onClick={handleProcess}/>
    <ButtonExampleButton onClick={handleQuestion}/>
    </>
  );
}