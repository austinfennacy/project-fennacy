import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import ActionsDropdown from './actionsDropdown';

export default function SubmittalRow(props) {
  return (
    <TableRow>
      <TableCell align="right">
        {props.submittal.submittalNumber}
      </TableCell>
      <TableCell>
        {props.submittal.numberReccomended}
      </TableCell>
      <TableCell>
        {props.submittal.specificationSection}
      </TableCell>
      <TableCell>
        {/* {props.submittal.getSubmittalAcceptable ? "Yes" : "No"} */}
      </TableCell>
      <TableCell>
        {props.submittal.ahjRequired ? "Yes" : "No"}
      </TableCell>
      <TableCell>
        {props.submittal.ahjApproved ? "Yes" : "No"}
      </TableCell>
      <TableCell>
        {props.submittal.description}
      </TableCell>
      <TableCell>
        {props.submittal.subcontractorSupplier}
      </TableCell>
      <TableCell>
        {props.submittal.dateReceived}
      </TableCell>
      <TableCell>
        {props.submittal.respondBefore}
      </TableCell>
      <TableCell>
        {props.submittal.responseDate}
      </TableCell>
      <TableCell>
        {/* todo status */}
      </TableCell>

      <TableCell>
        <ActionsDropdown {...props}/>
      </TableCell>
    </TableRow>
  );
}