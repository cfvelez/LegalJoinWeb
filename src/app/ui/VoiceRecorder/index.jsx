import React, {useEffect,useState} from 'react'
import {timeToTextConverter,useRecorder} from '../../domains/AudioRecoder'
import {Typography,Container} from '@material-ui/core'
import RecordPanel from '../../../components/RecordPanel'
import moment from 'moment';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [startTime, setStartTime] = useState(moment());
  const [timeLabel, setTimeLabel] = useState('00:00:00');
  const recordAudio = useRecorder(null);
  const [recorderState, setRecorderState] = useState('');

  const setState = () => {
    let state = 'notAllowed';
    if(recordAudio){
      state = recordAudio.getState();
      console.log(state);
    }
    setRecorderState(state)
  }

  const onStart = () =>{
    if(recorderState === 'inactive' ){
      setRecording(true);
      setStartTime(moment());
      setTimeLabel('00:00:01');
      recordAudio.start();
      console.log(recordAudio.getState());
      setState();
    }
  }

 const onPause = () =>{
    if(recorderState === 'recording' ){
      recordAudio.pause();
      setRecording(false);
      setState();
    }
 }

 const onResume = () =>{
    if(recorderState === 'paused'){
      recordAudio.resume();
      setRecording(true);
      setState();
    }
 }

  const onStop = async () =>  {
    if(recorderState === 'recording' || recorderState === 'paused' ){
      const audio = await recordAudio.stop();
      audio.play();
      setState();
      setRecording(false);
      setTimeLabel('00:00:00');
    }
  }

  useEffect(() => {
      if(recording){
        const timer = setInterval(() => {
            let endTime = moment();
            let seconds = Math.ceil(moment.duration(endTime.diff(startTime)).as('seconds'));
            setTimeLabel(timeToTextConverter(seconds));
        }, 1000);

        return () => {
          clearInterval(timer);
        }
      }
    },[recording]);

    useEffect(() => {
      setState();
    },[recordAudio]);

  return (
    <Container>
      <Typography paragraph>
          Hola!!! vamos a grabar audios!!!
      </Typography>
      <RecordPanel
                  recorderState={recorderState}
                  timeLabel={timeLabel}
                  onStart={onStart}
                  onStop={onStop}
                  onPause={onPause}
                  onResume={onResume}
                />
    </Container>
  )
}
export default VoiceRecorder

