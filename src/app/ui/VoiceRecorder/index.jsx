import React, {useEffect,useState,useRef} from 'react'
import {timeToTextConverter,useRecorder} from '../../domains/AudioRecoder'
import {Container} from '@material-ui/core'
import RecordPanel from '../../../components/RecordPanel'
import MyAudioControl from '../../../components/MyAudioControl'
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
  const [sources, setSources] = useState([]);

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
      const  {audioUrl,audioBlob ,name} = await recordAudio.stop();
      console.log('audioBlob:',audioBlob);
      await convertToBase64(audioBlob);
      setTimeLabel('00:00:00');
      setResumeTime(false);
      section.current = 0;
      timeElapsed.current = {};
      addSource(audioUrl, name)
    }
  }
  const convertToBase64 = (blob) =>{
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
    var base64String = reader.result;
    console.log('Base64 String - ', base64String);

    // Simply Print the Base64 Encoded String,
    // without additional data: Attributes.
    console.log('Base64 String without Tags: ',
      base64String.substr(base64String.indexOf(', ') + 1));
   }
  }

  const addSource = (url, title) =>{
    let temp = sources
    let obj = {'url':url, 'title': title}
    temp.push(obj);
    setSources(temp);
    setState();
    setRecording(false);
  }

  const showControls = () =>{
    return sources.map( (obj) => <MyAudioControl key={obj.title} url = {obj.url} name = {obj.title}/>);
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

    },[recordAudio,sources]);

  return (
    <Container>
      <RecordPanel
          recorderState={recorderState}
          timeLabel={timeLabel}
          onStart={onStart}
          onStop={onStop}
          onPause={onPause}
          onResume={onResume}
        />
    {showControls()}
    </Container>
  )
}
export default VoiceRecorder

