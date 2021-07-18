import './App.css';
import SubmittalTable from './components/submittalTable/submittalTable';
import Submittal from './components/submittal/submittal';
import Navbar from './components/navbar/navbar';
import Container from '@material-ui/core/Container';
import { Router } from "@reach/router";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <Container maxWidth="xl">
        <Router> 
          <SubmittalTable path="/" />
          <Submittal path="submittal/:id" />
        </Router>
      </Container>
    </div>
  );
}
