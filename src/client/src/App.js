import './App.css';
import SubmittalTable from './components/submittalTable/submittalTable';
import Submittal from './components/submittal/submittal';
import Login from './components/login/login';
import Register from './components/register/register';
import Navbar from './components/navbar/navbar';
import { Router } from "@reach/router";
import SubmittalPdf from './components/submittal/submittalPdf';
import NotFound from './components/notFound/notFound';
import { AuthProvider } from './contexts/auth/AuthContext';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router className="Router">
          <WebClient path="/*" />
          <SubmittalPdf path="submittalPdf/:id" />
        </Router>
      </AuthProvider>
    </div>
  );
}

function WebClient() {
  return (
    <div className="WebClient">
      <Navbar />

      <Router className="Router">
        <SubmittalTable path="/" />
        <Login path="/login" />
        <Register path="/register" />
        <Submittal path="submittal/:id" />
        <NotFound default />
      </Router>
    </div>
  );
}
