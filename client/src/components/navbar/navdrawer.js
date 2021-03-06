import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@reach/router'
import { ReadmeContext } from '../../contexts/readme/ReadmeContext';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavDrawer() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const { setShowReadme } = useContext(ReadmeContext)
  const handleShowReadme = () => {
    toggleDrawer(false)
    setShowReadme(true)
  }

  return (
    <React.Fragment>
      <IconButton edge="start"
        onClick={toggleDrawer(true)}
        className={classes.menuButton}
        color="inherit"
        aria-label="menu">
          <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button
              component={Link}
              to="/">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={'Submittals'} />
            </ListItem>
            <ListItem button
              onClick={handleShowReadme}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary={'Help (README.md)'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
