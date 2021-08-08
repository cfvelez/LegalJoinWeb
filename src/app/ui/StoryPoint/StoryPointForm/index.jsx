import React,{ useState, useEffect } from 'react';
import {Grid,Typography,TextField,Button} from '@material-ui/core';
import MyButton from '../../../../components/MyButton'
import MyPaper from '../../../../components/MyPaper'
import MyDivider from '../../../../components/MyDivider'
import storypointTxt from '../../../../constants/txt/storypointTxt';
import lang from '../../../../constants/index';
import Storypoint from '../../../domains/StoryPoint';
import Story from '../../../domains/Story';
import {Loading,
        changeDestination,
        hideNotification} from '../../../../utils/AppBehaviour'
import routes from '../../../routing/routes'

import {useHistory,useParams} from "react-router-dom";

const StoryPointForm = () => {
  let { storyId } = useParams();
  let { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [appointmentAt, setAppointmentAt] = useState('');
  const [title, setTitle] = useState('');

  const history = useHistory();

  const Save = async ()=> {
    hideNotification();
    Loading(true);

    if(id){
      let storypoint = new Storypoint(id,storyId, name, description, appointmentAt);
      await storypoint.update();
    }
    else{
      let storypoint = new Storypoint(id,storyId, name, description, appointmentAt);
      const resp = await storypoint.create();
      if(resp === true)
          clearForm();
    }
    Loading(false);
  }

  const clearForm = () => {
    setName('');
    setDescription('');
    setAppointmentAt('');
  }

  const Cancel = ()=> {
    hideNotification();
    clearForm();
    changeDestination(routes.story.list);
    history.replace(routes.story.list);
 }

  useEffect(() => {
    if(storyId){
      (async () => {
        let data = await Story.getById(storyId);
        let text = data.title + ' ' + '(' + data.contact.name + ' ' + data.contact.lastname + ')';
        setTitle(text);
        return false
      })();
    }

  }, []);


  return (

    <MyPaper customWidth={'60%'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{storypointTxt.title}{title}</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
                    variant='outlined'
                    placeholder={storypointTxt.name}
                    name="name"
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                    fullWidth/>
          </Grid>
          <Grid item xs={12} >
                <TextField
                  variant='outlined'
                  placeholder={storypointTxt.description}
                  name="description"
                  value={description}
                  onChange = {(e) => setDescription(e.target.value)}
                  fullWidth />
          </Grid>
          <Grid item xs={12} >

          </Grid>

        </Grid>
        <MyDivider/>
        <Grid container spacing={2} direction="row" justifyContent="space-between" align="center">
          <Grid item xs={6} >
            <Button variante="outlined" color="secondary" onClick={()=> Cancel()}>{lang.cancel}</Button>
          </Grid>
          <Grid item xs={6}>
            < MyButton color="primary" onClick={()=> Save()}>{lang.save}</MyButton>
          </Grid>
        </Grid>
    </MyPaper>
   );
}
export default StoryPointForm;
