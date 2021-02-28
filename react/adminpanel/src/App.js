import { useEffect, useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Login } from './functions/login/login.js';
import { Graph } from './functions/stats/graph.js';
import { Logout } from './functions/login/logout.js';
import { loginstatus } from './functions/login/loginstatus.js';
//import { currentloginid } from './functions/login/loginid.js';
import { ViewUser } from './functions/users/viewuser.js';
import { CreateUser } from './functions/users/createuser.js';
import { ViewAllUsersComponent } from './functions/users/viewallusers.js';
import { ViewQuestionComponent } from './functions/question/viewquestion.js';
import facebook from './images/facebook.svg';
import instagram from './images/instagram.svg';
import github from './images/github.svg';
import youtube from './images/youtube.svg';

function Process(props) {
  const logoStyle = {
  textAlign: 'center',
  borderBottom: '2px solid #FCD667',
  };
  const footer = {
  height: '15vh',
  width: '100pw',
  backgroundColor: '#FCD667',
  left: '0',
  right: '0',
  bottom: '0',
  }; 
  const iconStyling = {
  height: '50px',
  width: '50px',
  float: 'right',
  marginRight: '.4em',
  marginTop: '-.7em',
  };
  if (props.count === "Logged In") {
    return (
    <>
    <h1 style={logoStyle} >Got A Question</h1>
    <Graph />
    <ViewUser />
    <CreateUser/>
    <Logout setCount={props.setCount}/>
    <ViewAllUsersComponent />
    <ViewQuestionComponent />
    <h1 style={footer}>
      <p>© 2020 Got A Question Inc. All Rights Reserved.</p>
      <img style={iconStyling} alt="Facebook Logo" src={facebook}/>
      <img style={iconStyling} alt="Instagram Logo" src={instagram}/>
      <img style={iconStyling} alt="Github Logo" src={github}/>
      <img style={iconStyling} alt="Youtube Logo" src={youtube}/>
    </h1>
    </>
    );
  } else {
    return (
      <Login setCount={props.setCount}/>
    );
}
}

function App() {
  const [count, setCount] = useState();

  const loginSuccess = () => {
    setCount("Logged In"); 
  }

  const loginFailed = () => {
    setCount("Not Logged In"); 
  }

  useEffect(() => {
   loginstatus(loginSuccess, loginFailed);
   
  }, []);

  return <Process count={count} setCount={setCount} />;
}

export default App;