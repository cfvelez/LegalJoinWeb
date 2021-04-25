import React from 'react'
import {IconButton, Grid} from '@material-ui/core'
import {SettingsVoice, Stop, Pause, PlayArrow, Block} from '@material-ui/icons/';
import recordPanelStyle from './recordPanelStyle';
import MyPaper from '../MyPaper';

const RecordPanel = (props) => {

  const ControlMode = () => {
    const recorderState = props.recorderState;
    let control = [];

    console.log(recorderState)
    switch (recorderState) {
      case 'inactive':
        control.push
              (<IconButton key="rec-start" aria-label="record" color="primary" className={style.position} onClick={props.onStart}>
                <SettingsVoice/>
              </IconButton>);
      break;
      case 'recording':
        control.push(<IconButton key="rec-active-stop" aria-label="stop" color="secondary" className={style.position} onClick={props.onStop}><Stop/></IconButton>);
        control.push(<IconButton key="rec-pause" aria-label="pause" color="secondary" className={style.position} onClick={props.onPause}><Pause/></IconButton>);
      break;

      case 'paused':
        control.push(<IconButton key="rec-inactive-stop" aria-label="stop" color="secondary" className={style.position} onClick={props.onStop}><Stop/></IconButton>);
        control.push(<IconButton key="rec-resume" aria-label="resume" color="secondary" className={style.position} onClick={props.onResume}><PlayArrow/></IconButton>);
      break;

      default:
        control.push
              (<IconButton key="rec-blocked" aria-label="blocked" color="secondary" className={style.position} >
                <Block/>
              </IconButton>);
      break;
    }
    return control;
  }



  const style = recordPanelStyle()
  return (
          <MyPaper>
          <Grid container spacing={2} justify="center" alignItems="center">
            <Grid container item xs={2}>
              <ControlMode />
            </Grid>
            <Grid container item xs={2}>
               {props.timeLabel}
            </Grid>
            <Grid container item xs={6}>
            </Grid>
          </Grid>
          </MyPaper>
      );
}

export default RecordPanel
