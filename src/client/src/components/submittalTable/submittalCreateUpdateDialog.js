import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function SubmittalCreateUpdateDialog(props) {
  const [formValues, setFormValues] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
        props.fetchSubmittals();
      })
      .catch(error => console.log(error));

    props.setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={props.isDialogOpen}
      onClose={props.handleClose}
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
          <Button onClick={props.handleClose} color="default">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}