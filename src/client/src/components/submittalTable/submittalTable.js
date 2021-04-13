import React, { Component } from 'react';
import './submittalTable.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class SubmittalRow extends Component {
  render() {
    return (
      <TableRow key={this.props.submittal.id}>
        <TableCell align="right">
          {this.props.submittal.submittalNumber}
        </TableCell>
        <TableCell>
          {this.props.submittal.description}
        </TableCell>
      </TableRow>
    );
  }
}

class SubmittalTable extends Component {
  constructor() {
    super();
    this.state = {
      submittals: []
    }
  }

  componentDidMount() {
    fetch('/submittals')
    .then(res => res.json())
    .then(submittals => this.setState({submittals}));
  }

  render() {
    return (
      <div>
        <h3>
          Shop Drawings
        </h3>
        <TableContainer component={Paper}>
          <Table size="small" >
            <TableHead>
              <TableRow>
                <TableCell align="right">SD No.</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.submittals.map(submittal => 
                <SubmittalRow submittal={submittal} />)}
            </TableBody>
          </Table>
        </TableContainer>
        <ul>
        </ul>
      </div>
    );
  }
}

export default SubmittalTable;
