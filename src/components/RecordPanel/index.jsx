import React from 'react'
import {IconButton, Grid} from '@material-ui/core'
import {SettingsVoice, Stop, Pause, PlayArrow, Block} from '@material-ui/icons/';
import recordPanelStyle from './recordPanelStyle';
import MyPaper from '../MyPaper';

const RecordPanel = (props) => {

  const ControlMode = () => {
    const recorderState = props.recorderState;
    let control = [];

    switch (recorderState) {
      case 'inactive':
        control.push
              (<Grid key="grid-rec-start" item xs={6}>
                  <IconButton key="rec-start" aria-label="record" color="primary" className={style.position} onClick={props.onStart}>
                    <SettingsVoice/>
                </IconButton>
              </Grid>);
        control.push(<Grid key="time" item xs={6}><MyPaper>{props.timeLabel}</MyPaper></Grid>)
      break;
      case 'recording':
        control.push(<Grid key="grid-rec-active-stop" item xs={4}><IconButton key="rec-active-stop" aria-label="stop" color="secondary" className={style.position} onClick={props.onStop}><Stop/></IconButton></Grid>);
        control.push(<Grid key="grid-rec-pause"  item xs={4}><IconButton key="rec-pause" aria-label="pause" color="secondary" className={style.position} onClick={props.onPause}><Pause/></IconButton></Grid>);
        control.push(<Grid key="time" item xs={4}><MyPaper>{props.timeLabel}</MyPaper></Grid>)
        break;

      case 'paused':
        control.push(<Grid key="grid-rec-inactive-stop" item xs={4}><IconButton key="rec-inactive-stop" aria-label="stop" color="secondary" className={style.position} onClick={props.onStop}><Stop/></IconButton></Grid>);
        control.push(<Grid key="grid-rec-resume" item xs={4}><IconButton key="rec-resume" aria-label="resume" color="secondary" className={style.position} onClick={props.onResume}><PlayArrow/></IconButton></Grid>);
        control.push(<Grid key="time" item xs={4}><MyPaper>{props.timeLabel}</MyPaper></Grid>)
        break;

      default:
        control.push
              (<Grid key="grid-rec-blocked" item xs={12}><IconButton key="rec-blocked" aria-label="blocked" color="secondary" className={style.position} >
                  <Block/>
                </IconButton>
              </Grid>);
      break;
    }

    return control;
  }

  const style = recordPanelStyle()
  return (
          <div className={style.position}>
          <Grid container spacing={1}>
          <ControlMode />
          </Grid>
          </div>
      );
}

export default RecordPanel
