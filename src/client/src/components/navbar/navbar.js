import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavDrawer from './navdrawer';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(45deg, hsl(4, 100%, 30%) 10%, hsl(18, 100%, 40%) 90%)',
    boxShadow: '0 0px 5px 2px hsl(4, 30%, 70%)',
  },
});

export default function Navbar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <NavDrawer />
          <Typography variant="h6" color="inherit">
            PROJECT FENNACY
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}