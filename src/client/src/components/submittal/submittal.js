import './submittal.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import SubmittalPdf from './submittalPdf';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'hsl(0, 0%, 16%)',
    height: '100%',
  },
  container: {
    height: '100%',
  },  
  infoBar: {
    height: '100%',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }, 
}))

export default function Submittal(props) {
  const id = props.id
  const classes = useStyles()

  let getSubmittalPdf = () =>
    axios.get(`/getSubmittalPdf?id=${id}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })
  
  let saveSubmittalPdf = () =>
   getSubmittalPdf()
     .then((response) => {
        const blob = new Blob([response.data], {type: 'application/pdf'})
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `submittal-test.pdf`
        link.click()
     })
    .catch(err => console.log(err))

  const [submittal, setSubmittal] = useState([])
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson)), [id])

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <SubmittalPdf id={id} />
          </Paper>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.infoBar}
            elevation={3}
            variant="outlined"
            square>
            <h2>Submittal #{submittal.submittalNumber} ({submittal.description})</h2>
            <div>todo make me full height</div>
            <br />
            <button onClick={saveSubmittalPdf}>Download Submittal PDF</button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
