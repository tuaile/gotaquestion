import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Message } from 'semantic-ui-react'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost/gotaquestion">
        Got A Question
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export function Login(props) {
  const handleLogin = () => {
    document.getElementById("loginmessage").innerHTML = "Loading..."; 
    var studentnumber = document.getElementById("studentnumber");
    var password = document.getElementById("password");
    var logindetails = new FormData();
      logindetails.append('studentnumber', studentnumber.value);
      logindetails.append('password', password.value);
      fetch('http://localhost/gotaquestion/api/api.php?action=adminlogin', {
        method: 'POST',
        body: logindetails,
        credentials: 'include'
      })
      fetch('http://localhost/gotaquestion/api/api.php?action=adminlogin', {
        method: 'POST',
        body: logindetails,
        credentials: 'include'
      })
      .then(function(response) {
        if (response.status === 202) {
          var studentnumber = document.getElementById("studentnumber");
          var logindetails = new FormData();
          logindetails.append('numberofstudent', studentnumber.value);
          fetch('http://localhost/gotaquestion/api/api.php?action=processlogin', {
            method: 'POST',
            body: logindetails,
            credentials: 'include'
          })
          document.getElementById("loginmessage").innerHTML = "Success Your Logged In"; 
          props.setCount("Logged In");
        }
        if (response.status === 410) {
          document.getElementById("loginmessage").innerHTML = "Please Fill All Fields";
        }
        if (response.status === 403) {
          document.getElementById("loginmessage").innerHTML = "Invalid Username Or Password";
        }
        if (response.status === 501) {
          document.getElementById("loginmessage").innerHTML = "Try Again";
        }
        if (response.status === 409) {
          document.getElementById("loginmessage").innerHTML = "Already Logged In, Try Again";
          fetch('http://localhost/gotaquestion/api/api.php?action=logout', {
            method: 'GET',
            credentials: 'include'
          });
        }
      })
    }

  const classes = useStyles();

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="studentnumber"
            label="Student Number"
            name="studentnumber"
            autoComplete="studentnumber"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Message warning>
            <p id="loginmessage">Please Login</p>
          </Message>
          <Button
            type="Button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Suck shit"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}