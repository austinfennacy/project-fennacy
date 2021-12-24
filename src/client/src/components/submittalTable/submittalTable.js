import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SubmittalRow from './submittalRow';
import SubmittalCreateUpdateDialog from './submittalCreateUpdateDialog';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SpinnerContext } from '../../contexts/spinner/SpinnerContext';

const useStyles = makeStyles((theme) => ({
  createSubmittal: {
    background: 'linear-gradient(45deg, hsl(200, 100%, 40%) 30%, hsl(191, 90%, 54%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '0 0 16px 0'
  },
  title: {
    fontSize: "4rem",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "2px",
  },
  grid: {
    paddingTop: "24px"
  },
  seedSubmittals: {
    margin: theme.spacing(2),
    padding: theme.spacing(6),
    color: theme.palette.text.primary,
    width: 500,
    background: 'linear-gradient(315deg, hsl(120, 100%, 92%) 30%, hsl(120, 100%, 96%) 90%)',
    boxShadow: '2px 2px 5px hsla(4, 20%, 10%, 0.5)',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  seedButton: {
    background: 'linear-gradient(45deg, hsl(120, 100%, 30%) 30%, hsl(120, 100%, 40%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '4px 0 32px 0'
  },
}));

export default function SubmittalTable() {
  const classes = useStyles();

  const [submittals, setSubmittals] = useState([]);
  const { setLoading } = useContext(SpinnerContext)

  useEffect(() => fetchSubmittals(), []);
  const fetchSubmittals = () => {
    setLoading(true)

    fetch('/submittals')
      .then(res => res.json())
      .then((res) => {
        if (res.success) {
          setSubmittals(res.submittals)
        } else {
          sessionStorage.removeItem('isAuthed')
          sessionStorage.removeItem('user')
          window.location = '/login'
        }
      })
      .finally(() => setLoading(false))
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container alignItems="baseline" className={classes.grid}>
        <Grid item xs={3} align="left">
          <Button
            variant="contained"
            className={classes.createSubmittal}
            onClick={handleOpen}
            align="left"
            startIcon={<AddIcon />}>
            Create Submittal
          </Button>
          <SubmittalCreateUpdateDialog
            isDialogOpen={open}
            handleClose={handleClose}
            fetchSubmittals={fetchSubmittals}/>
        </Grid>
        <Grid item xs={6} align="center">
          <div className={classes.title}>
            Submittals
          </div>
        </Grid>
      </Grid>
      <TableContainer component={Paper} mt={2}>
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell align="center">Submittal No.</TableCell>
              <TableCell align="center">No. Rec'd</TableCell>
              <TableCell align="center">Spec. Section</TableCell>
              <TableCell align="center">AHJ Req'd</TableCell>
              <TableCell align="center">AHJ Appv.</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">SubContr. Supplier</TableCell>
              <TableCell align="center">Date Rec'd</TableCell>
              <TableCell align="center">Respond Before</TableCell>
              <TableCell align="center">Respond Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittals.map(submittal =>
              <SubmittalRow
                submittal={submittal}
                key={submittal.id}
                refreshSubmittals={fetchSubmittals} />)}
          </TableBody>
        </Table>
      </TableContainer>
      {(submittals.length == 0 ? <SeedSubmittals fetchSubmittals={fetchSubmittals} /> : '')}
    </Container>
  );
}

function SeedSubmittals({fetchSubmittals}) {
  const classes = useStyles()

  const handleSeed = () => {
    fetch('/seedSubmittals', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    })
    .catch(err => alert(`error - could not seed submittals: ${err}`))
    .finally(() => fetchSubmittals())
  }

  return (
    <div>
      <Paper className={classes.seedSubmittals} square>
        <Grid container direction="column" alignItems="center">
          <h2>
            Welcome to Project Fennacy!
          </h2>

          <div>
            It looks like you don't have any submittals created yet. Since this is a demo project,
            I've added an easy way for you to play with the app using real data:
          </div>

          <ul>
            <li>
              Click <strong> Seed 5 Submittals </strong> below to automatically seed your account
              with 5 realistic looking submittals.
            </li>
            <li>
              Or, if you'd like to start one from scratch, click <strong> Create Submittal </strong>
              at the top left corner of this page.
            </li>
          </ul>

          <Button
            variant="contained"
            className={classes.seedButton}
            align="center"
            onClick={handleSeed}
            startIcon={<AddIcon />}
            >
            Seed 5 Submittals
          </Button>

          <div>
            If you'd like a walkthrough on this project and it's features, click on the <strong> ? </strong>
            button in the bottom right corner of this page, or view that same information in the README
            (along with the source code) on GitHub:
          </div>

          <a style={{marginTop:'16px'}} href="https://github.com/austinfennacy/project-fennacy">
            https://github.com/austinfennacy/project-fennacy
          </a>

        </Grid>
      </Paper>
    </div>
  )
}
