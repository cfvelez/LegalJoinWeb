import React,{ useState } from 'react';
import {Grid,Typography,TextField, Divider,Button} from '@material-ui/core'
import MyButton from '../../../../components/MyButton'
import MyPaper from '../../../../components/MyPaper'
import contactTxt from '../../../../constants/txt/contactTxt';
import lang from '../../../../constants/index';
import Contact from '../../../domains/Contact';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [visible, setVisible] = useState(true);
  const Save = ()=> {
     let contact = new Contact(null, name, lastName);
     console.log(contact.create());
  }

  return (
    <MyPaper customWidth={'60%'}>
        <Grid container spacing={2} direction="column" >
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

        <Grid container spacing={2} direction="row">
          <Grid item xs={12} >
            <Divider />
          </Grid>
          <Grid item xs={6} >
            <Button variante="outlined" color="secondary">{lang.cancel}</Button>
          </Grid>
          <Grid item xs={6}>
            < MyButton color="primary" onClick={()=> Save()}>{lang.save}</MyButton>
          </Grid>
        </Grid>
    </MyPaper>
   );
}

export default ContactForm;
