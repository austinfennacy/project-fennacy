import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export default function CopiesDialog(props) {
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

    fetch(`/api/submittal/updateCopies/${props.values.id}`, {
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
      maxWidth="xs"
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

              <hr />

              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="copiesForContractor"
                label="Copies for Contractor"
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {formValues.copiesForContractor}
              />
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="copiesForOwner"
                label="Copies for Owner"
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {formValues.copiesForOwner}
              />
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="copiesForInspector"
                label="Copies for Inspector"
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {formValues.copiesForInspector}
              />
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="copiesForFile"
                label="Copies for File"
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {formValues.copiesForFile}
              />
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                name="copiesForOther"
                label="Copies for Other"
                type="number"
                fullWidth
                onChange={handleInputChange}
                defaultValue = {formValues.copiesForOther}
              />
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
