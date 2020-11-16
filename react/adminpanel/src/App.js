import './App.css';

function App() {
	const handleLogin = () => {
    	var studentnumber = 470842368;
            var logindetails = new FormData();
            logindetails.append('numberofstudent', studentnumber);
            fetch('http://localhost/gotaquestion/api/api.php?action=processlogin', {
            method: 'POST',
            body: logindetails,
            credentials: 'include',
        })
  	}

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

  return (
  	<>
    <button onClick={handleLogin}>Process Login</button>
    <button onClick={handleQuestion}>View Question</button>
    </>
  );
}

export default App;
