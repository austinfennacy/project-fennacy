import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function SubSpecDialog(props) {
  const [formValues, setFormValues] = useState(props.values);
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value == '' ? null : value
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`/submittal/updateSubSpec/${props.values.id}`, {
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
      maxWidth="xs"
      open={props.isDialogOpen}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleUpdate}>
        <DialogTitle id="form-dialog-title">
          Update Submittal No. and Specification Section
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            name="submittalNumber"
            label="Submittal Number"
            type="number"
            fullWidth
            onChange={handleInputChange}
            defaultValue = {props.values.submittalNumber}
          />
          <TextField
            variant="outlined"
            margin="normal"
            name="specificationNumber"
            label="Specification Section"
            type="number"
            fullWidth
            onChange={handleInputChange}
            defaultValue = {props.values.specificationNumber}
          />
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