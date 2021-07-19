import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const [submittal, setSubmittal] = useState([]);
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittal) => setSubmittal(submittal)), []);

  return (
    <div>
      <h2>submittal id no {submittal.id}</h2>
      <div>number {submittal.submittalNumber}</div>
      <div>description {submittal.description}</div>
      <button onClick={saveSubmittalPdf}>Download Submittal PDF</button>
    </div>
  )
}
