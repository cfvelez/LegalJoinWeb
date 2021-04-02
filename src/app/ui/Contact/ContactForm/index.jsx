import React,{ useState } from 'react';
import {Grid,Typography,TextField,Button} from '@material-ui/core'
import MyButton from '../../../../components/MyButton'
import MyPaper from '../../../../components/MyPaper'
import MyDivider from '../../../../components/MyDivider'
import contactTxt from '../../../../constants/txt/contactTxt';
import lang from '../../../../constants/index';
import Contact from '../../../domains/Contact';
import {Loading,
        changeDestination,
        hideNotification} from '../../../../utils/AppBehaviour'
import routes from '../../../routing/routes'

import {useHistory} from "react-router-dom";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const history = useHistory();

  const Save = async ()=> {
    let contact = new Contact(null, name, lastName);
    hideNotification();
    Loading(true);
    const resp = await contact.create();
    if(resp === true){
      clearForm();
    }
    Loading(false);
  }

  const clearForm = () => {
    setName('');
    setLastName('');
  }

  const Cancel = ()=> {
    hideNotification();
    clearForm();
    changeDestination(routes.contact.list);
    history.replace(routes.contact.list);
 }

  return (
    <MyPaper customWidth={'60%'}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Typography variant="h5">{contactTxt.title}</Typography>
          </Grid>
          <Grid item xs={12} >
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6} >
                  <TextField
                    variant='outlined'
                    placeholder={contactTxt.name}
                    name="name"
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                    fullWidth/>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  placeholder={contactTxt.lastName}
                  name="lastName"
                  value={lastName}
                  onChange = {(e) => setLastName(e.target.value)}
                  fullWidth />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <MyDivider/>
        <Grid container spacing={2} direction="row" justify="space-between" align="center">
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

export default ContactForm;
