import React, { Component } from 'react';
import './shopDrawings.css';

class ShopDrawings extends Component {
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
            <li key={shopDrawing.id}>
              {shopDrawing.shopDrawingNumber} - {shopDrawing.description}
            </li>)}
        </ul>
      </div>
    );
  }
}

export default ShopDrawings;
