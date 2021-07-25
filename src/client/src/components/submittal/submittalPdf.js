import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },  
}))

export default function SubmittalPdf(props) {
  const id = props.id
  const classes = useStyles()

  const [submittal, setSubmittal] = useState([])
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson)), [id])

  return (
    <Paper className={classes.paper}>
      <h2>Submittal #{submittal.submittalNumber} ({submittal.description})</h2>
      <br />
      <div>
        test
      </div>
      <div>
        test
      </div>
      <div>
        test
      </div>
      <div>
        test
      </div>
    </Paper>
  )
}
