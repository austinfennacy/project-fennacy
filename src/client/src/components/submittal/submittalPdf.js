import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  pdf: {
    fontFamily: "TimesNewRoman"
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
    <div className={classes.pdf}>
      <h2>
        SHOP DRAWING AND SUBMITTAL TRANSMITTAL
      </h2>
      <div>
        FUSD McLane High School CTE
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
