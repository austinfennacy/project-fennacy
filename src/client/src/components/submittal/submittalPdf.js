import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pdf: {
    fontFamily: "TimesNewRoman",
    padding: theme.spacing(6)
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
  
  const [submittal, setSubmittal] = useState([])
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson)), [id])

  return (
    <div className={classes.pdf}>
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



      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
