import { useEffect } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Login } from './functions/login/login.js';
import { Logout } from './functions/login/logout.js';
import { loginstatus } from './functions/login/loginstatus.js';
import { currentloginid } from './functions/login/loginid.js';
import { ViewUser } from './functions/users/viewuser.js';

function App() {
  	const handleQuestion = () => {
     var studentnumber = 470842368;
        var logindetails = new FormData();
        logindetails.append('numberofstudent', studentnumber);
        fetch('http://localhost/gotaquestion/api/api.php?action=viewquestion', {
          method: 'POST',
          body: logindetails,
          credentials: 'include'
        })
  	}
  useEffect(() => {
  	loginstatus();
  }, []);

  return (
  	<>
    <ViewUser />
    <Login />
    <Logout />
    <button onClick={handleQuestion}>View Questions</button>
    <button onClick={handleQuestion}>Testing</button>
    </>
  );
}

export default App;
