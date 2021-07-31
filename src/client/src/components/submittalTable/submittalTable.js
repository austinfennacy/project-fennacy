import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SubmittalRow from './submittalRow';
import SubmittalCreateUpdateDialog from './submittalCreateUpdateDialog';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  createSubmittal: {
    background: 'linear-gradient(45deg, hsl(200, 100%, 40%) 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    marginBottom: '16px'
  },
});

export default function SubmittalTable() {
  const classes = useStyles();

  const [submittals, setSubmittals] = useState([]);
  useEffect(() => fetchSubmittals(), []);
  const fetchSubmittals = () => fetch('/submittals')
    .then(res => res.json())
    .then((submittals) => setSubmittals(submittals));

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <h3>
        Submittals
      </h3>
      <div align="left" >
        <Button
          variant="contained"
          className={classes.createSubmittal}
          onClick={handleOpen}
          align="left"
          startIcon={<AddIcon />}>
          Create Submittal
        </Button>
        <SubmittalCreateUpdateDialog 
          isDialogOpen={open}
          handleClose={handleClose}
          fetchSubmittals={fetchSubmittals}/>
      </div>
      <TableContainer component={Paper} mt={2}>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell align="center">Submittal No.</TableCell>
              <TableCell align="center">No. Rec'd</TableCell>
              <TableCell align="center">Spec. Section</TableCell>
              <TableCell align="center">Submit. Appv.</TableCell>
              <TableCell align="center">AHJ Req'd</TableCell>
              <TableCell align="center">AHJ Appv.</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">SubContr. Supplier</TableCell>
              <TableCell align="center">Date Rec'd</TableCell>
              <TableCell align="center">Respond Before</TableCell>
              <TableCell align="center">Respond Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittals.map(submittal =>
              <SubmittalRow
                submittal={submittal}
                key={submittal.id}
                refreshSubmittals={fetchSubmittals} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <ul>
      </ul>
    </Container>
  );
}
