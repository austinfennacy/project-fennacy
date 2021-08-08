import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  editableBox: {
    display: "inline-block",
    width: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    background: "rgba(154, 219, 254, 0.3)",
    borderColor: "rgba(154, 219, 254, 0.9)",
    border: "2px solid",
    padding: "2px",
    "& *": {
      position: "relative",
      transform: "translateZ(-1px)",  
    },
  },
  hiddenEditText: {
    background: "rgba(154, 219, 254, 0.3)",
    color: "white",
    display: "none",
    justifyContent: "center",
    alignContent: "center",
    cursor: "pointer",
  }
}))

export default function EditableBox(props) {
  const classes = useStyles()

  const [showEdit] = useState(props.showEdit)
  let editableBox = () => showEdit ? classes.editableBox : ""

  let showEditText = () => {
    document.getElementById("hiddenEditText").style.display = "grid" 
  }
  let hideEditText = () => {
    document.getElementById("hiddenEditText").style.display = "none"
  }

  useEffect(() => {
    renderEditBox()
    window.addEventListener("resize", renderEditBox);
    return _ => {
      window.removeEventListener("resize", renderEditBox);
    }
  });

  let renderEditBox = () => {
    let offsetHeight = document.getElementById('editableBox').offsetHeight;
    let offsetWidth = document.getElementById('editableBox').offsetWidth;
    document.getElementById("hiddenEditText").setAttribute("style",`
      height:${offsetHeight}px;
      width:${offsetWidth}px;
      position: relative;
      top: ${-1*offsetHeight}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 700;
      letter-spacing: 0.02rem;
    `)
    document.getElementById("editBoxWrapper").setAttribute("style",`
      height:${offsetHeight}px;
    `)
  }

  return (
    <div id="editBoxWrapper" onMouseEnter={showEditText} onMouseLeave={hideEditText}>
      <div id="editableBox" className={editableBox()}>
        {props.children}
      </div>
      <div id="hiddenEditText" className={classes.hiddenEditText} onClick={props.openDialog}>
        EDIT
      </div>
    </div>
  )
 }
