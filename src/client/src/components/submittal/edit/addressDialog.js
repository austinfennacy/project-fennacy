import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default function AddressDialog(props) {
  const [formValues, setFormValues] = useState({
    ...props.values,
    // addressType: props.addressType,
  });


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

    fetch(`/submittal/updateAddress/${props.values.architectAddressId}`, {
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
          Update Address
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            name="addressNameLine"
            label="Addressee"
            fullWidth
            onChange={handleInputChange}
            defaultValue = {props.values.addressNameLine}
          />
          <TextField
            variant="outlined"
            margin="normal"
            name="addressLine1"
            label="Street"
            fullWidth
            onChange={handleInputChange}
            defaultValue = {props.values.addressLine1}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                name="city"
                label="City"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {props.values.city}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                name="state"
                label="State"
                fullWidth
                onChange={handleInputChange}
                defaultValue={props.values.state}
                inputProps={{
                  maxLength: 2,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                margin="normal"
                name="zip"
                label="ZIP"
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue={props.values.zip}
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