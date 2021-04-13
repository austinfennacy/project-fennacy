import './App.css';
import SubmittalTable from './components/submittalTable/submittalTable';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <h1>
          Main component
        </h1>
        <SubmittalTable />
      </Container>
    </div>
  );
}

export default App;
