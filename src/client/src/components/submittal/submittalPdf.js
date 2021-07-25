import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },  
}))

export default function SubmittalPdf(props) {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      todofix pdf goes here
    </Paper>
  )
}