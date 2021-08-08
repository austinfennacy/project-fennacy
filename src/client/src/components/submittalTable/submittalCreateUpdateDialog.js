import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SubmittalCreateUpdateDialog(props) {
  const classes = useStyles();

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
  const [dateReceived, setDateReceived] = React.useState(props?.values?.dateReceived
    ? new Date(props.values.dateReceived)
    : null);
  const handleDateReceivedChange = (date) => {
    setDateReceived(date);
    setFormValues({
      ...formValues,
      dateReceived: date,
    })
  };
  const [respondBefore, setRespondBefore] = React.useState(props?.values?.respondBefore
    ? new Date(props.values.respondBefore)
    : null);
  const handleRespondBeforeChange = (date) => {
    setRespondBefore(date);
    setFormValues({
      ...formValues,
      respondBefore: date,
    })
  };
  const [responseDate, setResponseDate] = React.useState(props?.values?.responseDate
    ? new Date(props.values.responseDate)
    : null);
  const handleResponseDateChange = (date) => {
    setResponseDate(date);
    setFormValues({
      ...formValues,
      responseDate: date,
    })
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

    props.handleClose();
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
    
    props.handleClose();
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
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
                  variant="outlined"
                  margin="normal"
                  name="description"
                  label="Description"
                  fullWidth
                  onChange={handleInputChange}
                  defaultValue = {props?.values?.description ?? ""}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="numberRecommended"
                  label="Number Reccomended"
                  type="number"
                  fullWidth
                  onChange={handleInputChange}
                  defaultValue = {props?.values?.numberRecommended ?? ""}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="specificationSection"
                  label="Specification Section"
                  type="number"
                  fullWidth
                  onChange={handleInputChange}
                  defaultValue = {props?.values?.specificationSection ?? ""}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                  margin="normal"
                >
                  <InputLabel id="ahjRequiredLabel">
                    AHJ Required
                  </InputLabel>
                  <Select
                    name="ahjRequired"
                    labelId="ahjRequiredLabel"
                    onChange={handleInputChange}
                    defaultValue = {props?.values?.ahjRequired ?? ""}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                  margin="normal"
                >
                  <InputLabel id="ahjApprovedLabel">
                    AHJ Approved
                  </InputLabel>
                  <Select
                    name="ahjApproved"
                    labelId="ahjApprovedLabel"
                    onChange={handleInputChange}
                    defaultValue = {props?.values?.ahjApproved ?? ""}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  name="subcontractorSupplier"
                  label="Subcontractor Supplier"
                  fullWidth
                  onChange={handleInputChange}
                  defaultValue = {props?.values?.subcontractorSupplier ?? ""}
                />
              </Grid>
              <Grid item xs={3}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="outlined"
                  format="MM/dd/yyyy"
                  margin="normal"
                  name="dateReceived"
                  label="Date Received"
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  value={dateReceived}
                  onChange={handleDateReceivedChange}
                />
              </Grid>
              <Grid item xs={3}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="outlined"
                  format="MM/dd/yyyy"
                  margin="normal"
                  name="respondBefore"
                  label="Respond Before"
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  value={respondBefore}
                  onChange={handleRespondBeforeChange}
                />
              </Grid>
              <Grid item xs={3}>
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
            {submitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}