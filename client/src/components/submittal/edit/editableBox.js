import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles(() => ({
  editableBox: {
    display: "inline-block",
    width: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    background: "rgba(154, 219, 254, 0.3)",
    boxShadow: "0 0 0 2px rgba(154, 219, 254, 1) inset",
    padding: "2px",
    "& *": {
      position: "relative",
      transform: "translateZ(-1px)",  
    },
  },
  hiddenEditText: {
    background: "rgba(154, 219, 254, 0.3)",
    color: "white",
    fontSize: "1.3vw",
    display: "none",
    justifyContent: "center",
    alignContent: "center",
    cursor: "pointer",
  }
}))

export default function EditableBox(props) {
  const classes = useStyles()

  // use UUID to create unique IDs for targeting when multiple EditableBox on 1 page
  const hiddenEditTextId = `hiddenEditText-${uuidv4()}`
  const editBoxWrapperId = `editBoxWrapper-${uuidv4()}`
  const editableBoxId = `editableBox-${uuidv4()}`

  const [showEdit, setShowEdit] = useState(props.showEdit)
  useEffect(
    () => setShowEdit(props.showEdit),
    [props.showEdit],
  );

  let editableBox = () => showEdit ? classes.editableBox : ""

  let showEditText = () => {
    if (showEdit) {
      document.getElementById(hiddenEditTextId).style.display = "grid" 
    }
  }
  let hideEditText = () => {
    document.getElementById(hiddenEditTextId).style.display = "none"
  }

  useEffect(() => {
    renderEditBox()
    window.addEventListener("resize", renderEditBox);
    return _ => {
      window.removeEventListener("resize", renderEditBox);
    }
  });

  let renderEditBox = () => {
    let offsetHeight = document.getElementById(editableBoxId).offsetHeight;
    let offsetWidth = document.getElementById(editableBoxId).offsetWidth;
    document.getElementById(hiddenEditTextId).setAttribute("style",`
      height:${offsetHeight}px;
      width:${offsetWidth}px;
      position: relative;
      top: ${-1*offsetHeight}px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 700;
      letter-spacing: 0.02rem;
    `)
    document.getElementById(editBoxWrapperId).setAttribute("style",`
      height:${offsetHeight}px;
    `)
  }

  return (
    <div id={editBoxWrapperId} onMouseEnter={showEditText} onMouseLeave={hideEditText}>
      <div id={editableBoxId} className={editableBox()}>
        {props.children}
      </div>
      <div id={hiddenEditTextId} className={classes.hiddenEditText} onClick={props.openDialog}>
        EDIT
      </div>
    </div>
  )
 }
