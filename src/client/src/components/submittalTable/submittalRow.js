import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ActionsDropdown from './actionsDropdown';

export default function SubmittalRow(props) {
  return (
    <TableRow>
      <TableCell align="right">
        {props.submittal.submittalNumber}
      </TableCell>
      <TableCell>
        {props.submittal.numberReceived}
      </TableCell>
      <TableCell>
        {props.submittal.specificationSection}
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
        <ActionsDropdown {...props}/>
      </TableCell>
    </TableRow>
  );
}