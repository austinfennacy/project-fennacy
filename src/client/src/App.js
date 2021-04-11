import './App.css';
import ShopDrawingTable from './components/shopDrawingTable/shopDrawingTable';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <h1>
          Main component
        </h1>
        <ShopDrawingTable />
      </Container>
    </div>
  );
}

export default App;
