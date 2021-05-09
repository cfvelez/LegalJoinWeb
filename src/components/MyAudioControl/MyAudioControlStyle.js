import {makeStyles} from '@material-ui/core'

const MyAudioControlStyle = (width) =>{

  const myStyle = makeStyles(theme => ({
    margin: {
      marginTop: theme.spacing(2)
    },
  }))

  return myStyle();

}

export default MyAudioControlStyle
