import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import { AuthContext } from '../../contexts/auth/AuthContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';

import NavDrawer from './navdrawer';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(45deg, hsl(4, 100%, 30%), 70%, hsl(18, 100%, 40%))',
    boxShadow: '0 0px 5px 2px hsl(4, 30%, 70%)',
  },
  userWrapper: {
    marginLeft: 'auto',
    display: 'flex',
  },
  user: {
    marginRight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    background: 'linear-gradient(45deg, hsl(0, 0%, 16%) 30%, hsl(0, 0%, 24%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: 'none',
    color: 'white',
    height: 36,
    padding: '0 16px',
  },
});

export default function Navbar() {
  const classes = useStyles();

  const { isAuthed } = useContext(AuthContext)

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          {isAuthed ? <NavDrawer /> : ''}
          <Typography variant="h6" color="inherit">
            PROJECT FENNACY
          </Typography>
          {isAuthed ? <Logout /> : ''}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function Logout() {
  const classes = useStyles();

  function handleLogout() {
    fetch('/api/logout', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(res => res.json())
    .then(async function(res) {
      if (res.success) {
        sessionStorage.removeItem('isAuthed')
        sessionStorage.removeItem('user')

        window.location = '/login'
      } else {
        alert(`logout failed: ${res.err}`)
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <div className={classes.userWrapper}>
      <User />

      <Button
        variant="contained"
        className={classes.logoutButton}
        onClick={handleLogout}
        align="center"
        startIcon={<LockIcon />}
        >
        Logout
      </Button>

    </div>
  )
}

function User() {
  const classes = useStyles()
  const { user } = useContext(AuthContext)

  return (
    <div className={classes.user}>
      <AccountCircleIcon />
      <Box px={1}>
        {user.name} ({user.email})
      </Box>
    </div>
  )

}
