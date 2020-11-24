import { useEffect } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Login } from './functions/login/login.js';
import { Logout } from './functions/login/logout.js';
import { loginstatus } from './functions/login/loginstatus.js';
import { currentloginid } from './functions/login/loginid.js';
import { ViewUser } from './functions/users/viewuser.js';
import { CreateUser } from './functions/users/createuser.js';
import { ViewAllUsersComponent } from './functions/users/viewallusers.js';
import { ViewQuestionComponent } from './functions/question/viewquestion.js';

function Process() {
  if (localStorage.getItem("Status") == "NLI") {
    return <Login />;
  } else {
  return (
    <>
    <ViewUser />
    <Logout />
    <CreateUser/>
    <ViewAllUsersComponent />
    <ViewQuestionComponent />
    </>
    );
  }
}
function App() {
  useEffect(() => {
    loginstatus();
    Process();
  }, []);

  return (
  	<Process />
  );
}

export default App;
