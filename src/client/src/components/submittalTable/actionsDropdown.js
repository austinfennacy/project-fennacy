import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/core/styles' 
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from "@reach/router";
import SubmittalCreateUpdateDialog from './submittalCreateUpdateDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles(() => ({
  button: {
    whiteSpace: "nowrap",
    padding: "6px 6px 6px 16px",
    background: 'linear-gradient(45deg, hsl(191, 90%, 54%) 10%, hsl(200, 100%, 40%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    margin: '0 0 8px 0'
  },
  arrowDropDownIcon: {
    marginLeft: "0.2rem",
  },
  listItemIcon: {
    minWidth: "0",
    marginRight: "12px",
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
}))

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))

export default function ActionsDropdown(props) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const [openUpdate, setOpenUpdate] = useState(false)
  const handleOpenUpdate = () => {
    setOpenUpdate(true)
    handleCloseMenu()
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false)
  }

  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => {
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const handleSubmitDelete = () => {
    fetch(`/submittal/${props.submittal.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(function (data) {
        if (data.success) {
          props.refreshSubmittals()
        }
      })
      .catch(error => console.log(error))

    setOpenDelete(false)
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClickMenu}
        className={classes.button}
      >
        Actions
        <ArrowDropDownIcon 
          className={classes.arrowDropDownIcon}
          />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Link to={`submittal/${props.submittal.id}`} className={classes.link}>
          <MenuItem>
            <ListItemIcon className={classes.listItemIcon}>
              <LaunchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View Submittal" />
          </MenuItem>
        </Link>

        <MenuItem onClick={handleOpenUpdate}>
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <SubmittalCreateUpdateDialog 
          isDialogOpen={openUpdate}
          handleClose={handleCloseUpdate}
          fetchSubmittals={props.refreshSubmittals}
          values={{
            ...props.submittal,
          }}/>

        <MenuItem onClick={handleOpenDelete}>
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete this submittal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmitDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      </StyledMenu>
    </div>
  )
}