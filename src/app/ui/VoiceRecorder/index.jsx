import React, {useEffect,useState} from 'react'
import {timeToTextConverter,useMyRecoder} from '../../domains/AudioRecoder'
import {Typography,Container} from '@material-ui/core'
import RecordPanel from '../../../components/RecordPanel'
import moment from 'moment';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [startTime, setStartTime] = useState(moment());
  const [timeLabel, setTimeLabel] = useState('00:00:00');
  const mediaRecorder = useMyRecoder();
  let audioChunks = [];

  if( mediaRecorder ){
    mediaRecorder.ondataavailable = (e) => {
        console.log("data-available",e);
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
    }
    mediaRecorder.onstop = (e) =>{
      console.log("on-stop",e)
    }
  }

  const onPlay = () =>{
    if (mediaRecorder) {
      setRecording(true);
      setStartTime(moment());
      setTimeLabel('00:00:01');
      mediaRecorder.start();
    }
    else
      alert('Audio Bloquedado');

  }

  const onStop = async () =>{
    console.log(mediaRecorder.state)
    if(mediaRecorder.state !== 'inactive'){
      let info = await mediaRecorder.stop();
      console.log(audioChunks)
      if(info){
        console.log(info);
        console.log(mediaRecorder.state);
        const blob = new Blob(audioChunks,{ 'type' : 'audio/ogg; codecs=opus' });
        console.log(audioChunks)
        setBlobURL(window.URL.createObjectURL(blob));
        const audio = new Audio(blobURL);
        audio.play();
        setRecording(false);
        setTimeLabel('00:00:00');
      }
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

  return (
    <Container>
      <Typography paragraph>
          Hola!!! vamos a grabar audios!!!
      </Typography>
      <RecordPanel isRecording={recording} timeLabel={timeLabel} onPlay={onPlay} onStop={onStop}/>

    </Container>
  )
}
export default VoiceRecorder

