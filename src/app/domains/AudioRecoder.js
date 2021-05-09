
import { useEffect, useState } from "react";
import moment from 'moment';

const recordAudio = () =>{

   return(
        new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        const start = () =>  mediaRecorder.start();

        const pause = () => mediaRecorder.pause() ;

        const resume = () => mediaRecorder.resume();

        const getState = () => mediaRecorder.state;

        const stop = () =>

          new Promise(resolve => {
            mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(audioChunks);
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              const play = () => audio.play();
              let name = moment().format('MMMM_D_YYYY_h:mm:ss_a');
              resolve({ audioBlob, audioUrl, play, name });

            });
            mediaRecorder.stop();
            audioChunks = [];
          });

        resolve({ start, stop, pause, resume, getState });
      }));
}

export const useRecorder = () =>{
  const [recorderSystem, setRecorderSystem] = useState(null);

  useEffect( () =>{
    let buildRecorder = async () =>{
      const recorder = await recordAudio();
      setRecorderSystem(recorder);
    }
    buildRecorder();
  },[]);

  return recorderSystem;
}

export const timeToTextConverter = (parts) => {
  let time = 0;
  Object.entries(parts).forEach( ([key, value]) => time = time + value );
  let hours = Math.floor((time / (60 * 60)));
  let minutes = Math.floor((time / 60));
  let seconds = Math.floor((time % 60));

  let t_hours = hours.toString();
  let t_minutes = minutes.toString();
  let t_seconds = seconds.toString();

  if(t_hours.length === 1)
    t_hours = '0' + t_hours;

  if(t_minutes.length === 1)
    t_minutes = '0' + t_minutes;

  if(t_seconds.length === 1)
    t_seconds = '0' + t_seconds;

  return t_hours + ":" + t_minutes + ":" + t_seconds;
}


