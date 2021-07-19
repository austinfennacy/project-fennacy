import './submittal.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

export default function Submittal(props) {
  const id = props.id

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
    <div>
      <h2>Submittal #{submittal.submittalNumber} ({submittal.description})</h2>
      <button onClick={saveSubmittalPdf}>Download Submittal PDF</button>
    </div>
  )
}
