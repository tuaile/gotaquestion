import { useEffect, useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Login } from './functions/login/login.js';
import { Graph } from './functions/stats/graph.js';
import { Logout } from './functions/login/logout.js';
import { loginstatus } from './functions/login/loginstatus.js';
import { deletequestion } from './functions/question/deletequestion.js';
import { ViewUser } from './functions/users/viewuser.js';
import { ViewHelp } from './functions/users/help.js';
import { CreateUser } from './functions/users/createuser.js';
import { ViewAllUsersComponent } from './functions/users/viewallusers.js';
import { ViewQuestionComponent } from './functions/question/viewquestion.js';
import facebook from './images/facebook.svg';
import instagram from './images/instagram.svg';
import github from './images/github.svg';
import youtube from './images/youtube.svg';

function Process(props) {
  const logo = {
    color: '#e6e6e6',
    marginLeft: '.8vw',
    paddingTop: '.3vh',
    display: 'inline',
  }
  const headerLogoStyle = {
  height: '5vh',
  width: '97.8vw',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#1f1f1f',
  marginTop: '1.5vh',
  borderRadius: '.2em',
  };
  const footer = {
  height: '15vh',
  width: '100pw',
  backgroundColor: '#111111',
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
  const weeklyStats = {
  color: '#e6e6e6',
  borderBottom: '1px solid #e6e6e6',
  };
  const copyright = {
  color: 'white',
  };
  const chartBox = {
  height: '40vh',
  width: '97.8vw',
  marginRight: 'auto',
  marginLeft: 'auto',
  borderRadius: '.3em',
  backgroundColor: '#1f1f1f',
  padding: '1em',
  };
  const ViewAllUsersBox = {
  width: '97.8vw',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: '2vh',
  borderRadius: '.3em',
  backgroundColor: '#1f1f1f',
  padding: '1em',
  };
  const questionBox = {
  width: '97.8vw',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginTop: '2vh',
  borderRadius: '.3em',
  backgroundColor: '#1f1f1f',
  padding: '1em',
  };
   if (props.update === "Updated") {
    console.log('Hell');
  } else {
    
  }
  if (props.count === "Logged In") {
    document.body.style.backgroundColor = "#111111";
    return (
    <>
    <div style={headerLogoStyle}>
      <h1 style={logo}>GAQ</h1>
      <Logout setCount={props.setCount}/>
      <ViewUser />
      <ViewHelp/>
      <CreateUser/>
    </div>
    <div style={chartBox}>
    <h1 style={weeklyStats} >Fortnightly Actions</h1>
    <Graph />
    </div>
    <div style={questionBox}>
    <h1 style={weeklyStats} >Pending Answers</h1>
    <ViewQuestionComponent />
    </div>
    <div style={ViewAllUsersBox}>
    <h1 style={weeklyStats} >All Current Users</h1>
    <ViewAllUsersComponent />
    </div>
    <h1 style={footer}>
      <p style={copyright}>© 2020 Got A Question Inc. All Rights Reserved.</p>
      <img style={iconStyling} alt="Facebook Logo" src={facebook}/>
      <img style={iconStyling} alt="Instagram Logo" src={instagram}/>
      <img style={iconStyling} alt="Github Logo" src={github}/>
      <img style={iconStyling} alt="Youtube Logo" src={youtube}/>
    </h1>
    </>
    );
  } else {
    document.body.style.backgroundColor = "white";
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

  const [update, setUpdate] = useState("Updated");

  const updateSuccess = () => {
    setCount("Updated"); 
  }

  const updateFailed = () => {
    setCount("Not Updated"); 
  }
  return <Process count={count} setCount={setCount} update={update} setUpdate={setUpdate} />;
}

export default App;