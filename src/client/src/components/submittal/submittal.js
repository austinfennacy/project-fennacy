import React from 'react';
import axios from 'axios';

function getPdf() {
  return axios.get('/screenshot?url=https://example.com/', {
    responseType: 'arraybuffer',
    headers: {
      'Accept': 'application/pdf'
    }
  })
}

function savePdf() {
 return getPdf()
   .then((response) => {
      const blob = new Blob([response.data], {type: 'application/pdf'})
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `submittal-test.pdf`
      link.click()
   })
  .catch(err => console.log(err))
}

export default function Submittal(props) {
  return (
    <div>
      <h2>submittal id no {props.id}</h2>

      <button onClick={savePdf}>Download Submittal PDF</button>
    </div>
  )
}
