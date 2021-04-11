import React, { Component } from 'react';
import './shopDrawingTable.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ShopDrawingRow extends Component {
  render() {
    return (
      <TableRow key={this.props.shopDrawing.id}>
        <TableCell align="right">
          {this.props.shopDrawing.shopDrawingNumber}
        </TableCell>
        <TableCell>
          {this.props.shopDrawing.description}
        </TableCell>
      </TableRow>
    );
  }
}

class ShopDrawingTable extends Component {
  constructor() {
    super();
    this.state = {
      shopDrawings: []
    }
  }

  componentDidMount() {
    fetch('/shopDrawings')
    .then(res => res.json())
    .then(shopDrawings => this.setState({shopDrawings}));
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
              {this.state.shopDrawings.map(shopDrawing => 
                <ShopDrawingRow shopDrawing={shopDrawing} />)}
            </TableBody>
          </Table>
        </TableContainer>
        <ul>
        </ul>
      </div>
    );
  }
}

export default ShopDrawingTable;
