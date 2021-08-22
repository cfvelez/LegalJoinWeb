import React, {useEffect,useState,useRef} from 'react'
import {timeToTextConverter,useRecorder} from '../../domains/AudioRecoder'
import {Container} from '@material-ui/core'
import RecordPanel from '../../../components/RecordPanel'
import MyDialogInput from '../../../components/MyDialogInput'
import MyAudioControl from '../../../components/MyAudioControl'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useParams} from "react-router-dom";
import Story from '../../domains/Story';
import recoderTxt from '../../../constants/txt/recoderTxt.js'
import {Storage} from '../../../utils/AppBehaviour'
import ResourceObject from '../../domains/Resource'
import moment from 'moment';

const VoiceRecorder = () => {
  const { id } = useParams();
  const storyId =  id;
  const storage = new Storage();
  const [recording, setRecording] = useState(false);
  const [startTime, setStartTime] = useState(moment());
  const [resumeTime, setResumeTime] = useState(false);
  const [timeLabel, setTimeLabel] = useState('00:00:00');
  const recordAudio = useRecorder(null);
  const [recorderState, setRecorderState] = useState('');
  const section = useRef(0);
  const timeElapsed = useRef({});
  const [sources, setSources] = useState([]);
  const [myStory, setMyStory ] = useState('Historia');
  const [myContact, setMyContact ] = useState('Paciente');

  const [showDialog, setDialogVisible] = useState(false);
  const [resource, setResource] = useState({'id': -1 , 'title': '' });

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
      console.log('url:',audioUrl);
      const audioId = audioUrl.split('/').pop();
      await convertToBase64(audioId,audioBlob);
      setTimeLabel('00:00:00');
      setResumeTime(false);
      section.current = 0;
      timeElapsed.current = {};
      addSource(audioId,audioUrl,name)
    }
  }
  const convertToBase64 = (audioId,blob) =>{
    var reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      var base64String = reader.result;
      //console.log('Base64 String - ', base64String);
      let dataEncoded =  base64String.substr(base64String.indexOf(', ') + 1);
      // Simply Print the Base64 Encoded String,
      // without additional data: Attributes.
      //console.log('Base64 String without Tags: ',base64String);
      storage.set(audioId,dataEncoded);
    }

  }

  const addSource = (audioId, url, title) =>{
    let temp = sources
    let obj = {'id':audioId,  'url':url, 'title': title,}
    temp.push(obj);
    setSources(temp);
    setState();
    setRecording(false);
  }

  const removeSource = (audioId) =>{
    let temp = sources.filter( (source) => source.id !== audioId )
    setSources(temp);
    setState();
    setRecording(false);
    storage.remove(audioId);
  }

  const saveAudio = (audioId) =>{
    setResource({'id': audioId , 'title': ''});
    setDialogVisible(true);
  }

  const uploadAudio = async (storyPointId) =>{
    let base64File = storage.get(resource.id);
    let resourceAudio = new ResourceObject(resource.title,1,storyPointId,base64File);

    let result = await resourceAudio.upload();
    if(result){
      removeSource(resource.id);
      setDialogVisible(false);
    }
  }

  const showControls = () =>{
    return sources.map( (obj) => <MyAudioControl
                                    key={obj.id}
                                    url = {obj.url}
                                    name = {obj.title}
                                    discard={()=>removeSource(obj.id)}
                                    upload={()=>saveAudio(obj.id)}
                                    />);
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

    useEffect(() => {
      if(storyId){
        (async () => {
          let data = await Story.getById(storyId);
          setMyStory(data?.title);
          setMyContact(data?.contact?.name + ' ' + data?.contact?.lastname);
          return false
        })();
      }

    }, []);

  return (
    <Container>
        <MyDialogInput
          open = {showDialog}
          title = {recoderTxt.dialog.title}
          value = {resource.title}
          inputLabel = {recoderTxt.dialog.inputLabel}
          handleClose = {()=> setDialogVisible(false)}
          handleAction = {(p)=> uploadAudio(p)}
          storyId = {storyId}
          handleResourceName = {(txt) => setResource({...resource, 'title': txt})}
        />
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" >
            {myContact}
          </Link>
          <Link color="inherit">
            {myStory}
          </Link>
        <Typography color="textPrimary">{recoderTxt.title}</Typography>
      </Breadcrumbs>

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
