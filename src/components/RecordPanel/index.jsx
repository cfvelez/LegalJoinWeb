import React from 'react'
import {IconButton, Grid} from '@material-ui/core'
import {SettingsVoice, Stop} from '@material-ui/icons/';
import recordPanelStyle from './recordPanelStyle';
import MyPaper from '../MyPaper';

const RecordPanel = (props) => {

  const ControlMode = () => {
    const isRecording = props.isRecording;
    let control = <></>;
    if (isRecording) {
      control =
          (<IconButton aria-label="stop" color="secondary" className={style.position} onClick={props.onStop}>
              <Stop/>
            </IconButton>);
    }
    else{
      control =
              (<IconButton aria-label="record" color="primary" className={style.position} onClick={props.onPlay}>
                <SettingsVoice/>
              </IconButton>);
    }
    return control;
  }

  const style = recordPanelStyle()
  return (
          <MyPaper>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid container item xs={1}>
              <ControlMode />
            </Grid>
            <Grid container item xs={2}>
               {props.timeLabel}
            </Grid>
            <Grid container item xs={9}>
            </Grid>
          </Grid>
          </MyPaper>
      );
}

export default RecordPanel
