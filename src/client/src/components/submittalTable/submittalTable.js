import React, { useState, useEffect } from 'react';
import './submittalTable.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';

function SubmittalRow(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          color="secondary"
          onClick={handleClickOpen}
          startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you would like to delete this submittal?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={handleClose} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export default function SubmittalTable() {
  const [submittals, setSubmittals] = useState([]);

  useEffect(() => fetch('/submittals')
    .then(res => res.json())
    .then((submittals) => setSubmittals(submittals)), []);

  return (
    <div>
      <h3>
        Submittals
      </h3>
      <TableContainer component={Paper}>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell align="right">Submittal No.</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittals.map(submittal =>
              <SubmittalRow
                submittal={submittal}
                key={submittal.id} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <ul>
      </ul>
    </div>
  );
}
