import React, { useState, useEffect } from 'react';
import './submittalTable.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function SubmittalRow(props) {
  return (
    <TableRow>
      <TableCell align="right">
        {props.submittal.submittalNumber}
      </TableCell>
      <TableCell>
        {props.submittal.description}
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

function SubmittalTable() {
  const [submittals, setSubmittals] = useState([]);

  useEffect(() => fetch('/submittals')
    .then(res => res.json())
    .then((submittals) => setSubmittals(submittals)), []);

  return (
    <div>
      <h3>
        Submittals
      </h3>
      <TableContainer component={Paper}>
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
                key={submittal.id} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <ul>
      </ul>
    </div>
  );
}

export default SubmittalTable;
