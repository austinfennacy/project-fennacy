import './App.css';
import SubmittalTable from './components/submittalTable/submittalTable';
import Submittal from './components/submittal/submittal';
import Container from '@material-ui/core/Container';
import { Router } from "@reach/router";

export default function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <h1>
          Project Fennacy
        </h1>
        <Router>
          <SubmittalTable path="/" />
          <Submittal path="submittal/:id" />
        </Router>
      </Container>
    </div>
  );
}
