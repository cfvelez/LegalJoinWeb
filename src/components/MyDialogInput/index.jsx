import React,{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MyDialogInputStyle from './MyDialogInputStyle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Story from '../../app/domains/Story';


const MyDialogInput = (props) => {

  const style = MyDialogInputStyle();
  const [options, setOptions] = useState([ { title: ''}]);
  const [storypointId, setStorypointId] = useState(-1);

  const findStoryPoint = (id) =>{
    let mystorypoint = options.filter( item => {
        return item.id === id;
    })

    if(Array.isArray(mystorypoint) && mystorypoint.length > 0){
      return buildStoryPointInfo(mystorypoint.pop());
    }
    return "";
 }

const buildStoryPointInfo = (obj) => (obj.id + ' - ' + obj.name);


const handleStoryPointId = (option) => {
  let storypointInfoItem = options.filter(item => buildStoryPointInfo(item) === option)

  let idS = (storypointInfoItem.length > 0 &&  storypointInfoItem[0]?.id) ? storypointInfoItem[0].id : -1;
  setStorypointId(idS);
}

useEffect(() => {
  (async () => {
  let story = await Story.getById(props.storyId);

  if(story?.storypoints){
        let optionsList = story.storypoints.map(item=> {
                                        let title = buildStoryPointInfo(item);
                                        return {...item,title }
        });

    if(optionsList.length > 0)
      setOptions(optionsList)
  }

  })();


  }, []);


  return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent className={style.content}>
          <DialogContentText>
          {props.information}
          </DialogContentText>
          <Grid container  spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={props.inputLabel}
                type="text"
                onChange = {(event) => props.handleResourceName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                  id="storypointId"
                  options={options.map((option) => option.title)}
                  onChange={(e,v,r)=> handleStoryPointId(v)}
                  value={findStoryPoint(storypointId)}
                  renderInput={(params) => <TextField {...params} variant='outlined' label='Eventos' />}
              />
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>
        { (props.value.length > 2 && storypointId > 0) &&  <Button onClick={()=>props.handleAction(storypointId)} color="primary">Guardar</Button>}
        </DialogActions>
      </Dialog>
    )
}

export default MyDialogInput
