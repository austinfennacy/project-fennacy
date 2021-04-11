import React, { Component } from 'react';
import './shopDrawingTable.css';

class ShopDrawingRow extends Component {
  render() {
    return (
      <li key={this.props.shopDrawing.id}>
        {this.props.shopDrawing.shopDrawingNumber} - {this.props.shopDrawing.description}
      </li>
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
        <ul>
          {this.state.shopDrawings.map(shopDrawing => 
            <ShopDrawingRow shopDrawing={shopDrawing} />)}
        </ul>
      </div>
    );
  }
}

export default ShopDrawingTable;
