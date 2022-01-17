import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "@reach/router";
import Box from '@material-ui/core/Box';

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
  registerButton: {
    background: 'linear-gradient(45deg, hsl(120, 100%, 30%) 30%, hsl(120, 100%, 40%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '16px 0'
  },
  loginButton: {
    background: 'linear-gradient(45deg, hsl(200, 100%, 40%) 30%, hsl(191, 90%, 54%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '4px 0'
  },
}))

export default function Register() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState('Your account was created. Redirecting');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('Error');

  const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

  const handleRegister = (event) => {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(res => res.json())
    .then(async function (data) {
      if (data.success) {
        setShowError(false)
        setShowSuccess(true)
        await sleep(250)
        setSuccessText(`${successText} .`)
        await sleep(500)
        setSuccessText(`${successText} . .`)
        await sleep(500)
        setSuccessText(`${successText} . . .`)
        await sleep(250)
        window.location = '/login'
      } else {
        setShowError(true)
        setErrorText(data.err)
      }
    })
    .catch(error => console.log(error));
  };

  return (
    <div className={classes.fullHeight}>
      <Grid container className={classes.background}>
        <Grid item sm={2} lg={4}>
        </Grid>
        <Grid item sm={8} lg={4} className={classes.center}>
          <Paper className={classes.paper} square>
            <Grid container direction="column" alignItems="center">
              <h2>
                Register a new account
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
                name="name"
                label="Name"
                fullWidth
                onChange={handleInputChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                name="email"
                label="Email"
                fullWidth
                onChange={handleInputChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                name="password"
                label="password"
                type="password"
                fullWidth
                onChange={handleInputChange}
              />

              <Button
                variant="contained"
                className={classes.registerButton}
                onClick={handleRegister}
                align="center"
                startIcon={<AddIcon />}
                >
                Register
              </Button>

              <Link to={`/login`}>
                <Button
                  variant="contained"
                  className={classes.loginButton}
                  align="center"
                  startIcon={<ArrowBackIcon />}
                  >
                  Return to Login
                </Button>
              </Link>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={2} lg={4}>
        </Grid>
      </Grid>
    </div>
  );
}
