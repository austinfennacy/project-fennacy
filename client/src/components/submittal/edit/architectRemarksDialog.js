import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function ArchitectRemarksDialog(props) {
  const [formValues, setFormValues] = useState({...props.values})
  useEffect(() => {
    setFormValues(props.values)
  }, [props.values])

  const handleInputChange = (e) => {
    let { name, value } = e.target
    value = value === '' ? null : value
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleUpdate = (event) => {
    event.preventDefault()

    fetch(`/api/submittal/updateArchitectRemarks/${props.values.id}`, {
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
          Update Architect Remarks
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="normal"
            name="architectRemarks"
            label="Architect Remarks"
            multiline
            rows={4}
            fullWidth
            onChange={handleInputChange}
            defaultValue = {formValues.architectRemarks}
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
