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

export default function SubmittalTable() {
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
    <div>
      <h3>
        Submittals
      </h3>
      <div align="left" >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          align="left"
          startIcon={<AddIcon />}>
          Create Submittal
        </Button>
        <SubmittalCreateUpdateDialog 
          isDialogOpen={open}
          setOpen={setOpen}
          handleClose={handleClose}
          fetchSubmittals={fetchSubmittals}/>
      </div>
      <TableContainer component={Paper} mt={2}>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell align="right">Submittal No.</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
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
    </div>
  );
}
