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
});

export default function Navbar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
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