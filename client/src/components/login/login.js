import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "@reach/router";
import Box from '@material-ui/core/Box';
import { SpinnerContext } from '../../contexts/spinner/SpinnerContext';
import Alert from '@material-ui/lab/Alert';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: '100%',
  },
  background: {
    backgroundColor: 'hsl(0, 0%, 16%)',
    minHeight: '100%',
    height: 'auto',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(6),
    color: theme.palette.text.primary,
    width: 350,
    backgroundColor: 'white',
    boxShadow: '0 0 16px 2px rgb(153, 10, 0, .3)',
  },
  alert: {
    marginTop: '20px',
    width: 420,
  },
  successBox: {
    border: '1px solid hsl(120, 100%, 40%)',
    backgroundColor: 'hsl(120, 100%, 95%)',
    width: '100%',
    padding: '8px 0',
    margin: '8px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    border: '1px solid hsl(0, 100%, 40%)',
    backgroundColor: 'hsl(0, 100%, 95%)',
    width: '100%',
    padding: '8px 0',
    margin: '8px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    background: 'linear-gradient(45deg, hsl(200, 100%, 40%) 30%, hsl(191, 90%, 54%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '16px 0'
  },
  registerButton: {
    background: 'linear-gradient(45deg, hsl(120, 100%, 30%) 30%, hsl(120, 100%, 40%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '4px 0'
  },
  githubButton: {
    background: 'linear-gradient(45deg, hsl(216, 75%, 20%) 30%, hsl(212, 60%, 30%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '16px 0 4px 0'
  },
  disabled: {
    backgroundColor: '#ECECEC',
  }
}))

export default function Login() {
  const classes = useStyles();
  const { setLoading } = useContext(SpinnerContext)

  const [formValues, setFormValues] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState('Login successful');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('Error');

  const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

  function handleLogin() {
    setLoading(true)

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(res => {
        setLoading(false)
        return res.json()
      })
      .then(async function (res) {
        if (res.success) {
          sessionStorage.setItem('isAuthed', 'true')
          sessionStorage.setItem('user', JSON.stringify(res.user))

          setShowError(false)
          setShowSuccess(true)

          await sleep(250)
          setSuccessText(`${successText} .`)
          await sleep(500)
          setSuccessText(`${successText} . .`)
          await sleep(500)
          setSuccessText(`${successText} . . .`)
          await sleep(250)

          window.location = '/'
        } else {
          setShowError(true)
          setErrorText(res.err)
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className={classes.fullHeight}>
      <Grid container className={classes.background}>
        <Grid item sm={2} lg={4}>
        </Grid>
        <Grid item sm={8} lg={4} className={classes.center}>
          <Paper className={classes.paper} square>
            <Grid container direction="column" alignItems="center">
              <h2>
                Login
              </h2>

              {showSuccess &&
                <Box className={classes.successBox}>
                  {successText}
                </Box>
              }

              {showError &&
                <Box className={classes.errorBox}>
                  {errorText}
                </Box>
              }

              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="email"
                label="Email"
                disabled
                className={classes.disabled}
                fullWidth
                onChange={handleInputChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                name="password"
                label="password"
                type="password"
                disabled
                className={classes.disabled}
                fullWidth
                onChange={handleInputChange}
              />

              <Button
                variant="contained"
                className={classes.loginButton}
                onClick={handleLogin}
                startIcon={<VpnKeyIcon />}
              >
                Login
              </Button>

              <Link to={`/register`}>
                <Button
                  variant="contained"
                  className={classes.registerButton}
                  startIcon={<AddIcon />}
                >
                  Register
                </Button>
              </Link>
            </Grid>
          </Paper>
          <Alert severity="error" icon={false} className={classes.alert}>
            <div className={classes.center}>
              <b style={{marginBottom:"12px"}}>Warning - project no longer live</b>

              I have stopped paying to host my backend for this demo project, so I have disabled log in
              and use for the hosted version. However, I took several screen recordings in
              this project's README, so head on over there to see how it looked! The README also contains
              instructions on how you can build a working version of this project locally. You can view
              this README on GitHub, or by clicking the (?) icon in the bottom right corner.
              <Button
                variant="contained"
                className={classes.githubButton}
                href="https://github.com/austinfennacy/project-fennacy"
                target="_blank"
                startIcon={<GitHubIcon />}
              >
                View on GitHub
              </Button>
            </div>
          </Alert>
        </Grid>
        <Grid item sm={2} lg={4}>
        </Grid>
      </Grid>
    </div>
  );
}
