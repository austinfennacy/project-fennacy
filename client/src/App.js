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
import { SpinnerProvider } from './contexts/spinner/SpinnerContext';
import { ReadmeProvider } from './contexts/readme/ReadmeContext';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router className="Router">

          <WebClient path="/*" />


          {/* access to SubmittalPdf here so that PDF downloads don't have
          to deal with the Navbar */}
          <SubmittalPdf path="submittalPdf/:id" />
        </Router>
      </AuthProvider>
    </div>
  );
}

function WebClient() {
  return (
    <div className="WebClient">
      <ReadmeProvider>
        <Navbar />

        <SpinnerProvider>
          <Router className="Router">
            <ProtectedRoute path="/" component={SubmittalTable} />
            <ProtectedRoute path="submittal/:id" component={Submittal} />
            <ProtectedRoute default component={NotFound} />
            <UnprotectedRoute path="/login" component={Login} />
            <UnprotectedRoute path="/register" component={Register} />
          </Router>
        </SpinnerProvider>
      </ReadmeProvider>
    </div>
  );
}

function ProtectedRoute({ component: Component, path, ...rest }){
  const { isAuthed } = useContext(AuthContext)

  if (!isAuthed)
    return (<Redirect from={path} to="/login" noThrow />)

  return (<Component {...rest} />)
}

function UnprotectedRoute({ component: Component, path, ...rest }){
  // only able to view these routes if NOT authed. for login, register, etc
  const { isAuthed } = useContext(AuthContext)

  if (isAuthed)
    return (<Redirect from={path} to="/" noThrow />)

  return (<Component {...rest} />)
}

// const PublicRoute = ({ component: Component, ...rest }) =>
//   (<Component {...rest} />)
