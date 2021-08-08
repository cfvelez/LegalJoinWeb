import React from 'react'
import {Grid,Typography, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MyAudioControlStyle from './MyAudioControlStyle'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const MyAudioControl = (props) => {

  const style = MyAudioControlStyle()
  return (
    <div className={style.margin}>

    <Grid container alignContent='center'>
      <Grid item xs={10}>
        <AudioPlayer
          customAdditionalControls={[]}
          customVolumeControls={[]}
          layout="horizontal-reverse"
          src={props.url}
          // other props here
      />
      <Typography align="center">{props.name}</Typography>
      </Grid>
      <Grid item xs={1} >
          <IconButton aria-label="delete" color="secondary" onClick={() => { props.discard() }} ><DeleteIcon /></IconButton>
      </Grid>
      <Grid item xs={1} >
          <IconButton aria-label="upload" color="primary" onClick={() => { props.upload() }}><CloudUploadIcon /></IconButton>
      </Grid>
    </Grid>

    </div>
    )
}

export default MyAudioControl;



