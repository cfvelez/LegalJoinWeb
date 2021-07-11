import React from 'react'
import {Grid,Typography} from '@material-ui/core';
import MyAudioControlStyle from './MyAudioControlStyle'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const MyAudioControl = (props) => {

  const style = MyAudioControlStyle()
  return (
    <div className={style.margin}>

    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={8}>
        <AudioPlayer
          customAdditionalControls={[]}
          customVolumeControls={[]}
          layout="horizontal-reverse"
          src={props.url}
          // other props here
      />
      </Grid>
      <Grid item xs={4}>
        <Typography align="center">{props.name}</Typography>
      </Grid>
    </Grid>

    </div>
    )
}

export default MyAudioControl;



