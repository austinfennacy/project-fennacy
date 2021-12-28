import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SubmittalPdf from './submittalPdf'
import GetAppIcon from '@material-ui/icons/GetApp'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import { SpinnerContext } from '../../contexts/spinner/SpinnerContext';

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: '100%',
  },
  pdfBackground: {
    backgroundColor: 'hsl(0, 0%, 16%)',
    minHeight: '100%',
    height: 'auto',
  },
  infoBar: {
    minHeight: 'calc(100% - 34px)',
    height: 'auto',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pdfPaper: {
    margin: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  downloadSubmittal: {
    background: 'linear-gradient(45deg, hsl(120, 100%, 30%) 30%, hsl(120, 100%, 40%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px hsl(120, 30%, 70%)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '0 0 16px 0'
  },
  showEdit: {
    background: 'linear-gradient(45deg, hsl(200, 100%, 40%) 30%, hsl(191, 90%, 54%) 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '2px 2px 5px 0px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 36,
    padding: '0 16px',
    margin: '0 0 16px 0'
  },
}))

export default function Submittal(props) {
  const id = props.id
  const classes = useStyles()
  const { setLoading } = useContext(SpinnerContext)

  const [showEdit, setShowEdit] = useState({
    isVisible: true,
    editButtonText: "Hide Edit Boxes",
    editButtonIcon: <VisibilityOffIcon />,
  });
  const toggleShowEdit = () => {
      setShowEdit({
      isVisible: !showEdit.isVisible,
      editButtonText: showEdit.isVisible ? "Show Edit Boxes" : "Hide Edit Boxes",
      editButtonIcon: showEdit.isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />,
    })
  }

  let getSubmittalPdf = () =>
    axios.get(`/getSubmittalPdf?id=${id}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })

  let saveSubmittalPdf = () => {
    setLoading(true)

    getSubmittalPdf()
      .then((response) => {
         const blob = new Blob([response.data], {type: 'application/pdf'})
         const link = document.createElement('a')
         link.href = window.URL.createObjectURL(blob)
         link.download = `Submittal ${submittal.submittalNumber} - ${submittal.description}.pdf`
         link.click()
      })
     .catch(err => console.log(err))
     .finally(() => setLoading(false))
  }

  const [submittal, setSubmittal] = useState([])
  useEffect(() => {
    setLoading(true)

    fetch(`/api/submittal/${id}`)
      .then(res => res.json())
      .then((submittalJson) => setSubmittal(submittalJson))
      .finally(() => setLoading(false))

    // https://stackoverflow.com/questions/55840294
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className={classes.fullHeight}>
      <Grid container className={classes.pdfBackground}>
        <Hidden smDown>
          <Grid item sm={1}>
          </Grid>
        </Hidden>
        <Grid item sm={8} md={7} xl={8}>
          <Paper className={classes.pdfPaper} square>
            <SubmittalPdf id={id} showEdit={showEdit.isVisible} />
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item sm={1}>
          </Grid>
        </Hidden>
        <Grid item sm={4} md={3} xl={2}>
          <Paper className={classes.infoBar}
            elevation={3}
            variant="outlined"
            square>
            <h2>Submittal #{submittal.submittalNumber}
            <br />
            {submittal.description}</h2>
            <br />
            <div>
              <Button
                variant="contained"
                className={classes.showEdit}
                onClick={toggleShowEdit}
                align="center"
                startIcon={showEdit.editButtonIcon}>
                {showEdit.editButtonText}
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.downloadSubmittal}
                onClick={saveSubmittalPdf}
                align="center"
                startIcon={<GetAppIcon />}>
                Download Submittal PDF
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
