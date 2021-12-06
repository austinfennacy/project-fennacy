import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "@reach/router";

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
    width: 500,
    backgroundColor: 'white',
    boxShadow: '0 0 16px 2px rgb(153, 10, 0, .3)',
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

  const handleRegister = (event) => {
    // event.preventDefault();

    fetch('/register/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(res => res.json())
    .then(function (data) {
      console.log(data)
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
        // TODO DO SOMETHING IF LOGIN SUCCEEDS OR has error
    })
    .catch(error => console.log(error));
  };

  return (
    <div className={classes.fullHeight}>
      <Grid container className={classes.background}>
        <Grid item sm={4}>
        </Grid>
        <Grid item sm={4} className={classes.center}>
          <Paper className={classes.paper} square>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <h2>
                Register a new account
              </h2>

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
                autoFocus
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

              <Link to={`/register`}>
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
        <Grid item sm={4}>
        </Grid>
      </Grid>
    </div>
  );
}
