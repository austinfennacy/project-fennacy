import { useContext } from 'react'
import './App.css';
import SubmittalTable from './components/submittalTable/submittalTable';
import Submittal from './components/submittal/submittal';
import Login from './components/login/login';
import Register from './components/register/register';
import Navbar from './components/navbar/navbar';
import { Router, Redirect } from "@reach/router";
import SubmittalPdf from './components/submittal/submittalPdf';
import NotFound from './components/notFound/notFound';
import { AuthProvider, AuthContext } from './contexts/auth/AuthContext';

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
        <ProtectedRoute path="/" component={SubmittalTable} />
        <ProtectedRoute path="submittal/:id" component={Submittal} />
        <Login path="/login" />
        <Register path="/register" />
        <NotFound default />
      </Router>
    </div>
  );
}

function ProtectedRoute({ component: Component, ...rest }){
  const { isAuthed } = useContext(AuthContext)

  if (!isAuthed)
    return (<Redirect from="" to="login" noThrow />)

  return (<Component {...rest} />)
}

const PublicRoute = ({ component: Component, ...rest }) =>
  (<Component {...rest} />)
