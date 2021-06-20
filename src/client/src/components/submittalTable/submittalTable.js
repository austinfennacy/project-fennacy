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
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function SubmittalRow(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
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
            <Button onClick={handleDelete} color="secondary" autoFocus>
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

  useEffect(() => fetchSubmittals(), []);

  const fetchSubmittals = () => fetch('/submittals')
    .then(res => res.json())
    .then((submittals) => setSubmittals(submittals));

  const [formValues, setFormValues] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (event) => {
    event.preventDefault();

    fetch('/submittal/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(res => res.json())
      .then(function (data) {
        fetchSubmittals();
      })
      .catch(error => console.log(error));

    setOpen(false);
  };

  return (
    <div>
      <h3>
        Submittals
      </h3>
      <div align="left" >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          align="left"
          startIcon={<AddIcon />}>
          Create Submittal
        </Button>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleCreate}>
          <DialogTitle id="form-dialog-title">Create Submittal</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  autoFocus
                  variant="filled" 
                  margin="normal"
                  id="submittalNumber"
                  name="submittalNumber"
                  label="Submittal No."
                  type="number"
                  fullWidth
                  onChange={handleInputChange}
                  />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  variant="filled" 
                  margin="normal"
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  onChange={handleInputChange}
                  />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <TableContainer component={Paper} mt={2}>
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
                key={submittal.id}
                refreshSubmittals={fetchSubmittals} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <ul>
      </ul>
    </div>
  );
}
