import React, { useState, useEffect } from 'react'

export default function SubmittalPdf(props) {
  const id = props.id

  const [submittal, setSubmittal] = useState([])
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson)), [id])

  return (
    <div>
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
    </div>
  )
}
