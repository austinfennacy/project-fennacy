import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export default function TransmittedDialog(props) {
  const [formValues, setFormValues] = useState({...props.values})
  useEffect(() => {
    setFormValues(props.values)
  }, [props.values])

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleUpdate = (event) => {
    event.preventDefault()

    fetch(`/submittal/updateTransmitted/${props.values.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(res => res.json())
      .then(function (data) {
        props.fetchSubmittals()
      })
      .catch(error => console.log(error))
    
    props.handleClose()
  }

  const [responseDate, setResponseDate] = React.useState(props?.values?.responseDate
    ? new Date(props.values.responseDate)
    : null)
  const handleResponseDateChange = (date) => {
    setResponseDate(date)
    setFormValues({
      ...formValues,
      responseDate: date,
    })
  }

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
          Update Info
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  name="transmittedTo"
                  label="Transmitted To"
                  fullWidth
                  onChange={handleInputChange}
                  defaultValue = {formValues.transmittedTo}
                />
              </Grid>
              <Grid item xs={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                name="responseDate"
                label="Response Date"
                fullWidth
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                value={responseDate}
                onChange={handleResponseDateChange}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
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