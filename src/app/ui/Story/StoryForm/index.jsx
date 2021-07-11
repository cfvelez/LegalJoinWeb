import React,{ useState, useEffect } from 'react';
import {Grid,Typography,TextField,Button} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MyButton from '../../../../components/MyButton'
import MyPaper from '../../../../components/MyPaper'
import MyDivider from '../../../../components/MyDivider'
import storyTxt from '../../../../constants/txt/storyTxt';
import lang from '../../../../constants/index';
import Contact from '../../../domains/Contact';
import Story from '../../../domains/Story';
import {Loading,
        changeDestination,
        hideNotification} from '../../../../utils/AppBehaviour'
import routes from '../../../routing/routes'

import {useHistory,useParams} from "react-router-dom";

const StoryForm = () => {
  let { id } = useParams();
  const [contactId, setContactId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactList, setContactList] = useState([ { title: ''}]);
  const history = useHistory();

  const Save = async ()=> {
    hideNotification();
    Loading(true);

    if(id){
      let story = new Story(id, contactId, title, description);
      await story.update();
    }
    else{
      let story = new Story(id, contactId, title, description);
      const resp = await story.create();
      if(resp === true)
          clearForm();
    }
    Loading(false);
  }

  const buildContactInfo = (obj) => (obj.id + ' - ' + obj.name + ' ' + obj.lastname)

  const handleContactId = (option) => {
    let contactInfoItem = contactList.filter(item => buildContactInfo(item) === option)

    let id = (contactInfoItem.length > 0 &&  contactInfoItem[0]?.id) ? contactInfoItem[0].id : -1;
    setContactId(id);
  }

  const clearForm = () => {
    setContactId(0);
    setTitle('');
    setDescription('');
  }

  const Cancel = ()=> {
    hideNotification();
    clearForm();
    //changeDestination(routes.contact.list);
    //history.replace(routes.contact.list);
 }

 useEffect(() => {
  (async () => {
  let contacts = await Contact.getAll();

  contacts = contacts.map(item=> {
                                  let title = buildContactInfo(item);
                                  return {...item,title }
  });

    if(contacts.length > 0)
      setContactList(contacts)


  })();
  }, []);

  useEffect(() => {
    if(id){
      (async () => {
        let data = await Story.getById(id);
        setTitle(data.title);
        setDescription(data.description);
        setContactId(data.contactId);
        return false
      })();
    }

  }, []);


  return (
    <MyPaper customWidth={'60%'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{storyTxt.title}</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
                    variant='outlined'
                    placeholder={storyTxt.name}
                    name="title"
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    fullWidth/>
          </Grid>
          <Grid item xs={12} >
                <TextField
                  variant='outlined'
                  placeholder={storyTxt.description}
                  name="description"
                  value={description}
                  onChange = {(e) => setDescription(e.target.value)}
                  fullWidth />
          </Grid>
          <Grid item xs={12} >
            <Autocomplete
                id="contactId"
                options={contactList.map((option) => option.title)}
                onChange={(e,v,r)=> handleContactId(v)}
                renderInput={(params) => <TextField {...params} variant='outlined' label={storyTxt.contact} />}
            />
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
export default StoryForm;
