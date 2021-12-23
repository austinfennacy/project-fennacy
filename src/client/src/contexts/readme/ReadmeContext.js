import { createContext, useState, useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: 'black',
  },
  tooltipContents: {
    maxWidth: '240px',
    fontSize: '16px',
    lineHeight: '20px',
  },
  helpIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    background: 'linear-gradient(45deg, hsl(4, 100%, 30%), 70%, hsl(18, 100%, 40%))',
    boxShadow: '4px 4px 5px hsl(4, 20%, 10%)',
    position: 'absolute',
    bottom: 25,
    right: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  helpIcon: {
    width: 60,
    height: 60,
    color: 'white',
  },
  markdownWrapper: {
    width: '50vw',
    maxWidth: '50vw',
    minWidth: '50vw',
  },
}))

export const ReadmeContext = createContext()

export function ReadmeProvider({ children }) {
  // using context so that multiple locations can open the Readme
  const [showReadme, setShowReadme] = useState(false)

  return (
    <ReadmeContext.Provider value={{setShowReadme}}>
      <Readme showReadme={showReadme} setShowReadme={setShowReadme}/>
      {children}
    </ReadmeContext.Provider>
  )
}

function Readme({showReadme, setShowReadme}) {
  const classes = useStyles()
  const StyledTooltip = withStyles({
    tooltip: {
      color: 'white',
      backgroundColor: 'black'
    }
  })(Tooltip);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setShowReadme(open)
  }

  const [markdown, setMarkdown] = useState('todo fix me after commiting')
  // const readmePath = require('../../../../../README.md')
  // useEffect(()=>{
  //   fetch(readmePath)
  //     .then(res => {
  //       return res.text()
  //     })
  //     .then(text => setMarkdown(text))
  // }, [])

  return (
    <>
      <StyledTooltip title={Popover()}>
        <div onClick={toggleDrawer(true)} className={classes.helpIconWrapper}>
          <HelpIcon className={classes.helpIcon} />
        </div>
      </StyledTooltip>
      <Drawer anchor={'right'} open={showReadme} onClose={toggleDrawer(false)}>
        <div
          className={classes.markdownWrapper}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {markdown}
        </div>
      </Drawer>
    </>
  )
}

function Popover() {
  const classes = useStyles()

  return (
    <div className={classes.tooltipContents}>
      Click here for a quick reference to this project's README.md file
    </div>
  )
}
