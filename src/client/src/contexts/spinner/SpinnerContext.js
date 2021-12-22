import { Fade } from '@material-ui/core'
import { createContext, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { css } from '@emotion/react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinnerWrapper: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsla(0, 0%, 0%, 0.2)',
    zIndex: 1,
  },
}))

const loaderCss = css`
  position: relative;
  color: hsl(4, 100%, 30%);
  z-index: 2;
`

export const SpinnerContext = createContext()

export function SpinnerProvider({ children }) {
  const [loading, setLoading] = useState(false)

  return (
    <SpinnerContext.Provider value={{loading, setLoading}}>
      {loading ? <Spinner isLoading={loading} /> : ''}
      {children}
    </SpinnerContext.Provider>
  )
}

function Spinner() {
  // when this component is shown, spinner's loading value is always set to
  // true. the visibility is controlled by the parent component, not internally
  const classes = useStyles()

  return (
    <div className={classes.spinnerWrapper}>
      <FadeLoader loading color={'#990A00'} css={loaderCss} />
    </div>
  )
}
