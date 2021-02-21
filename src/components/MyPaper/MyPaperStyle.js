import {makeStyles} from '@material-ui/core'

const MyPaperStyle = (width) =>{

  const myStyle = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      width: width,
    },
  }))

  return myStyle();

}

export default MyPaperStyle
