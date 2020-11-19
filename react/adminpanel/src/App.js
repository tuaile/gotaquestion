import { useEffect } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Login } from './functions/login/login.js';
import { Logout } from './functions/login/logout.js';
import { loginstatus } from './functions/login/loginstatus.js';
import { currentloginid } from './functions/login/loginid.js';
import { ViewUser } from './functions/users/viewuser.js';
import { ViewQuestionComponent } from './functions/question/viewquestion.js';

function App() {
  useEffect(() => {
  	loginstatus();
  }, []);

  return (
  	<>
    <ViewUser />
    <Login />
    <Logout />
    <ViewQuestionComponent />
    </>
  );
}

export default App;
