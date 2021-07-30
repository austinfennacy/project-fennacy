import './submittalPdf.css'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pdfScreen: {
    fontFamily: "TimesNewRoman",
    padding: "4vw",
    fontSize: "1.2vw",
  },
  pdfPrint: {
    fontFamily: "TimesNewRoman",
    padding: theme.spacing(6),
  },
  todofix: {
    color: "red"
  },
  title: {
    marginTop: "0",
    marginBottom: "0.5rem",
  }
}))

export default function SubmittalPdf(props) {
  const id = props.id
  const classes = useStyles()
  const pdfClass = useMediaQuery("screen")
    ? classes.pdfScreen
    : classes.pdfPrint
  
  const [submittal, setSubmittal] = useState([])
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson)), [id])

  return (
    <div className={pdfClass}>
      
      <h2 className={classes.title} align="center">
        SHOP DRAWING AND SUBMITTAL TRANSMITTAL
      </h2>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className={classes.todofix}>
            FUSD McLane High School CTE
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.todofix} align="right">
            11905
          </div>
        </Grid>
      </Grid>

      <hr />

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <label>
            Description:
          </label>
          <div>
            {submittal.description}
          </div>
        </Grid>
        <Grid item xs={5}>

          <Grid container>
            <Grid item xs={8} align="right">
              <label>
                Submittal No.:
              </label>
            </Grid>
            <Grid item xs={4} align="right">
              <span>
                {submittal.submittalNumber}
              </span>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={8} align="right">
              <label>
                Spec Section:
              </label>
            </Grid>
            <Grid item xs={4} align="right">
              <span className={classes.todofix}>
                0987611
              </span>
            </Grid>
          </Grid>

        </Grid>
      </Grid>

      <hr />



      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
