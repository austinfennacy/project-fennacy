import './App.css';
import SubmittalTable from './components/submittalTable/submittalTable';
import Submittal from './components/submittal/submittal';
import Navbar from './components/navbar/navbar';
import { Router } from "@reach/router";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <Router className="Router"> 
        <SubmittalTable path="/" />
        <Submittal path="submittal/:id" />
      </Router>
    </div>
  );
}
