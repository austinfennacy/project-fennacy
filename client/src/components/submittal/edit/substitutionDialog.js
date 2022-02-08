import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function SubstitutionDialog(props) {
  const [formValues, setFormValues] = useState({...props.values})
  useEffect(() => {
    setFormValues(props.values);
  }, [props.values])

  const handleInputChange = (e) => {
    let { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    fetch(`/submittal/updateSubstitution/${props.values.id}`, {
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
          Is a Substitution?
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                autoFocus
                checked={formValues.isSubstitutionUsed}
                onChange={handleInputChange}
                name="isSubstitutionUsed"
                color="primary"
              />
            }
            label="Yes"
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
