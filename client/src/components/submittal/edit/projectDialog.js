import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function ProjectDialog(props) {
  const [formValues, setFormValues] = useState(props.values);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`/api/submittal/updateProject/${props.values.id}`, {
      method: 'PUT',
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

    props.handleClose();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={props.isDialogOpen}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleUpdate}>
        <DialogTitle id="form-dialog-title">
          Update Project Information
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="projectName"
                label="Project Name"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {props.values.projectName}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                margin="normal"
                name="projectNumber"
                label="Project No."
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {props.values.projectNumber}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose} color="default">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
