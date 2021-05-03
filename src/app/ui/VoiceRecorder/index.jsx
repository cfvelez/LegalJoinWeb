import React, {useEffect,useState,useRef} from 'react'
import {timeToTextConverter,useRecorder} from '../../domains/AudioRecoder'
import {Typography,Container} from '@material-ui/core'
import RecordPanel from '../../../components/RecordPanel'
import moment from 'moment';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [startTime, setStartTime] = useState(moment());
  const [resumeTime, setResumeTime] = useState(false);
  const [timeLabel, setTimeLabel] = useState('00:00:00');
  const recordAudio = useRecorder(null);
  const [recorderState, setRecorderState] = useState('');
  const section = useRef(0);
  const timeElapsed = useRef({});

  const setState = () => {
    let state = 'notAllowed';
    if(recordAudio){
      state = recordAudio.getState();
    }
    setRecorderState(state)
  }

  const onStart = () =>{
    if(recorderState === 'inactive' ){
      setRecording(true);
      setStartTime(moment());
      setTimeLabel('00:00:01');
      recordAudio.start();
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
      setResumeTime(moment());
      setState();
      section.current = section.current + 1;
    }
 }

  const onStop = async () =>  {
    if(recorderState === 'recording' || recorderState === 'paused' ){
      const audio = await recordAudio.stop();
      setState();
      setRecording(false);
      setTimeLabel('00:00:00');
      setResumeTime(false);
      section.current = 0;
      timeElapsed.current = {};
      audio.play();
    }
  }

  useEffect(() => {
      if(recording){
        const timer = setInterval(() => {
            let endTime = moment();
            let seconds = 0

            if(resumeTime){
              seconds = Math.ceil(moment.duration(endTime.diff(resumeTime)).as('seconds'));
            }
            else{
              seconds = Math.ceil(moment.duration(endTime.diff(startTime)).as('seconds'));
            }

            let temp = timeElapsed.current
            temp[section.current] = seconds;
            timeElapsed.current = temp;
            setTimeLabel(timeToTextConverter(timeElapsed.current));

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

