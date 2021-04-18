
import { useEffect, useState } from "react";

export const useMyRecoder = () => {
  const [mediaRecorder, setMediaRecorder]  = useState(false);

  useEffect(() => {
    navigator.getUserMedia({ audio: true },(stream) => {
      console.log('Permission Granted');
      setMediaRecorder(new MediaRecorder(stream));
    },
    () => {
      console.log('Permission Denied');
    },);
  },[]);

  return mediaRecorder;
};

export const timeToTextConverter = (time) => {
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


