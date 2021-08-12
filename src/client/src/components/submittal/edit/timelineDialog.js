import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export default function TimelineDialog(props) {
  const [formValues, setFormValues] = useState({...props.values})
  useEffect(() => {
    setFormValues(props.values)
  }, [props.values])

  const handleUpdate = (event) => {
    event.preventDefault()

    fetch(`/submittal/updateTimeline/${props.values.id}`, {
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

  const [earlyStartDate, setEarlyStartDate] = React.useState(props?.values?.earlyStartDate
    ? new Date(props.values.earlyStartDate)
    : null)
  const handleEarlyStartDateChange = (date) => {
    setEarlyStartDate(date)
    setFormValues({
      ...formValues,
      earlyStartDate: date,
    })
  }

  const [earlyFinishDate, setEarlyFinishDate] = React.useState(props?.values?.earlyFinishDate
    ? new Date(props.values.earlyFinishDate)
    : null)
  const handleEarlyFinishDateChange = (date) => {
    setEarlyFinishDate(date)
    setFormValues({
      ...formValues,
      earlyFinishDate: date,
    })
  }

  const [lateFinishDate, setLateFinishDate] = React.useState(props?.values?.lateFinishDate
    ? new Date(props.values.lateFinishDate)
    : null)
  const handleLateFinishDateChange = (date) => {
    setLateFinishDate(date)
    setFormValues({
      ...formValues,
      lateFinishDate: date,
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
          Update Timeline Info
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outlined"
              format="MM/dd/yyyy"
              margin="normal"
              name="earlyStartDate"
              label="Early Start Date"
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={earlyStartDate}
              onChange={handleEarlyStartDateChange}
              />

            <KeyboardDatePicker
              disableToolbar
              variant="outlined"
              format="MM/dd/yyyy"
              margin="normal"
              name="earlyFinishDate"
              label="Early Finish Date"
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={earlyFinishDate}
              onChange={handleEarlyFinishDateChange}
              />

            <KeyboardDatePicker
              disableToolbar
              variant="outlined"
              format="MM/dd/yyyy"
              margin="normal"
              name="lateFinishDate"
              label="Late Finish Date"
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={lateFinishDate}
              onChange={handleLateFinishDateChange}
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