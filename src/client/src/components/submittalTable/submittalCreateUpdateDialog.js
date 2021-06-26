import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function SubmittalCreateUpdateDialog(props) {
  const [formValues, setFormValues] = useState(
    props.values
      ? props.values
      : {});
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

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`/submittal/${props?.values?.id}`, {
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

    props.setOpen(false);
  };

  const dialogTitleText = props.values
    ? "Update Submittal"
    : "Create Submittal";
  const submitButtonText = props.values
    ? "Update"
    : "Create";
  const onSubmitHandler = props.values
  ? handleUpdate
  : handleCreate;

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={props.isDialogOpen}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={onSubmitHandler}>
        <DialogTitle id="form-dialog-title">{dialogTitleText}</DialogTitle>
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
                defaultValue = {props?.values?.submittalNumber ?? ""}
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
                defaultValue = {props?.values?.description ?? ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="default">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {submitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}