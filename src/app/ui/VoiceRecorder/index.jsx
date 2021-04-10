import React, {useEffect} from 'react'
import {audioRecorder, sleep} from '../../domains/AudioRecoder'
import {Typography,Container} from '@material-ui/core'

const VoiceRecorder = () => {

  useEffect(() => {
    (async () => {
      const recorder = await audioRecorder();
      recorder.start();
      await sleep(3000);
      console.log('grabando.....');
      const audio = await recorder.stop();
      audio.play();
    })();
  }, []);

  return (
    <Container>
      <Typography paragraph>
          Hola!!! vamos a grabar audios!!!
        </Typography>
    </Container>
  )
}
export default VoiceRecorder

