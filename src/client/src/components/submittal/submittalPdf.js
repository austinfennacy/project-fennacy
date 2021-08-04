import './submittalPdf.css'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  pdfScreen: {
    fontFamily: "TimesNewRoman",
    padding: "4vw",
    fontSize: "1.1vw",
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
  },
  bold: {
    fontWeight: "bold",
  },
  smallScreen: {
    fontSize: "0.95vw"
  },
  smallPrint: {
    fontSize: "0.8rem",
  },
  underlined: {
    borderBottom: "1px solid black",
    display: "inline-block",
    width: "100%",
  },
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

export default function SubmittalPdf(props) {
  const id = props.id
  const classes = useStyles()
  const pdfClass = useMediaQuery("screen")
    ? classes.pdfScreen
    : classes.pdfPrint
  const smallClass = useMediaQuery("screen")
    ? classes.smallScreen
    : classes.smallPrint
  
  const [submittal, setSubmittal] = useState([])
  useEffect(() => fetch(`/submittal/${id}`)
    .then(res => res.json())
    .then((submittalJson) => setSubmittal(submittalJson)), [id])

  const [showEdit] = useState(props.showEdit)
  let editableBox = () => showEdit ? classes.editableBox : "";

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

  let showEditText = () => {
    console.log('onMouseEnter')
    document.getElementById("hiddenEditText").style.display = "grid"; 
  };
  let hideEditText = () => {
    console.log('onMouseLeave')
    document.getElementById("hiddenEditText").style.display = "none"; 
  };

  return (
    <div className={pdfClass}>
      
      <h2 className={classes.title} align="center">
        SHOP DRAWING AND SUBMITTAL TRANSMITTAL
      </h2>
      <div id="editBoxWrapper" onMouseEnter={showEditText} onMouseLeave={hideEditText}>
        <div id="editableBox" className={editableBox()}>
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <div>
                  {submittal.projectName ? submittal.projectName : "[no project name]" }
                </div>
              </Grid>
              <Grid item xs={6}>
                <div align="right">
                  {submittal.projectNumber ? submittal.projectName : "[no project number]" }
                </div>
              </Grid>
            </Grid>
        </div>
        <div id="hiddenEditText" className={classes.hiddenEditText}>
          EDIT
        </div>
      </div>

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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label>
            Architect:
          </label>
          <div className={classes.todofix}>
            Darden Architects
          </div>
          <div className={classes.todofix}>
            6790 N. West Ave
          </div>
          <div className={classes.todofix}>
            Fresno, California 93711
          </div>
        </Grid>
        <Grid item xs={6}>
          <label>
            Project:
          </label>
          <div className={classes.todofix}>
            Sanger Educational Complex
          </div>
          <div className={classes.todofix}>
            1850 S Fowler Ave
          </div>
          <div className={classes.todofix}>
            Fresno, CA 93727
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <label>
            Contractor:
          </label>
          <div className={classes.todofix}>
            Harris Construction Company Inc.
          </div>
          <div className={classes.todofix}>
            5286 E Home Ave
          </div>
          <div className={classes.todofix}>
            Fresno, CA 93727
          </div>
        </Grid>
        <Grid item xs={6}>
          <label>
            Supplier:
          </label>
          <div className={classes.todofix}>
            Visalia Ceramic Tile
          </div>
          <hr />
          <label>
            Substitution:
          </label>
          <span className={classes.todofix}>
            ☐🗹 (DSA Approval Req'd)
          </span>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <label>
            Date Received:
          </label>
          <span>
            {submittal.dateReceived}
          </span>
        </Grid>
        <Grid item xs={3}>
          <label>
            No. Received:
          </label>
          <span className={classes.todofix}>
            12
          </span>
        </Grid>
        <Grid item xs={5}>
          <label>
            Date Returned:
          </label>
          <span>
            {submittal.responseDate}
          </span>
        </Grid>
      </Grid>

      <hr />

      <div style={{ minHeight:'4rem' }}>
        <label>
          Contractor Remarks:
        </label>
        <div className={classes.todofix}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
           quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        </div>
      </div>

      <Grid container>
        <Grid item xs={4}>
          <div>
            Other Required Information:
          </div>
          <div>
            <label>
              Warranty:
            </label>
            <span className={classes.todofix}>
              ☐🗹
            </span>
          </div>
          <div>
            <label>
              O and M Manuals:
            </label>
            <span className={classes.todofix}>
              ☐🗹
            </span>
          </div>
        </Grid>
        <Grid item xs={8} className={smallClass}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    Submittal Task #:
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4} className={`${classes.todofix} ${classes.underlined}`}>
                    01244
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    Early Start Date:
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4} className={`${classes.todofix} ${classes.underlined}`}>
                    8/25/2021
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    Early Finish Date:
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4} className={`${classes.todofix} ${classes.underlined}`}>
                    10/2/2021
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    Late Finish Date:
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4} className={`${classes.todofix} ${classes.underlined}`}>
                    11/26/2021
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Grid item xs={7} align="right">
                    Scheduled Float Time:
                  </Grid>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={4} className={`${classes.todofix} ${classes.underlined}`}>
                    2 months
                  </Grid>
                </Grid>
              </div>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
