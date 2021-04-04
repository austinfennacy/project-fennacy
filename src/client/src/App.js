import './App.css';
import ShopDrawings from './components/shopDrawings/shopDrawings';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <h1>
        Main component
      </h1>
      <Button variant="contained" color="primary">
        Material-UI proof of concept
      </Button>
      <ShopDrawings />
    </div>
  );
}

export default App;
