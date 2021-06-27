import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import SubmittalCreateUpdateDialog from './submittalCreateUpdateDialog';

export default function SubmittalRow(props) {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleSubmitDelete = () => {
    fetch(`/submittal/${props.submittal.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(function (data) {
        if (data.success) {
          props.refreshSubmittals();
        }
      })
      .catch(error => console.log(error));

    setOpenDelete(false);
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <TableRow>
      <TableCell align="right">
        {props.submittal.submittalNumber}
      </TableCell>
      <TableCell>
        {props.submittal.description}
      </TableCell>
      <TableCell>
      <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenUpdate}
          startIcon={<DeleteIcon />}>
          Update
        </Button>
        <SubmittalCreateUpdateDialog 
          isDialogOpen={openUpdate}
          handleClose={handleCloseUpdate}
          fetchSubmittals={props.refreshSubmittals}
          values={{
            id: props.submittal.id,
            submittalNumber: props.submittal.submittalNumber,
            description: props.submittal.description,
          }}/>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenDelete}
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
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
      </TableCell>
    </TableRow>
  );
}