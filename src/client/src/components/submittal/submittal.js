import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import SubmittalPdf from './submittalPdf';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';

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
  pdfPaper: {
    margin: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  downloadSubmittal: {
    background: 'linear-gradient(45deg, hsl(120, 100%, 30%) 30%, hsl(120, 100%, 40%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px hsl(120, 30%, 70%)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '0 0 16px 0'
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
        link.download = `Submittal ${submittal.submittalNumber} - ${submittal.description}.pdf`
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
          <Paper className={classes.pdfPaper} square>
            <SubmittalPdf id={id} showEdit={true} />
          </Paper>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.infoBar}
            elevation={3}
            variant="outlined"
            square>
            <h2>Submittal #{submittal.submittalNumber}
            <br />
            {submittal.description}</h2>
            <br />
            <Button
              variant="contained"
              className={classes.downloadSubmittal}
              onClick={saveSubmittalPdf}
              align="center"
              startIcon={<GetAppIcon />}>
              Download Submittal PDF
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
