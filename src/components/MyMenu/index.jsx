
import React, {useState} from 'react';
import {List,ListItem,ListItemText,Divider} from '@material-ui/core/';
import {Inbox,Voicemail,LocalLibrary} from '@material-ui/icons/';
import MyMenuItemLink from '../MyMenuItemLink'
import MyMenuStyle from './MyMenuStyle'
import routes from '../../app/routing/routes'
import menuTxt from '../../constants/txt/menuTxt';

export default function MyMenu(props) {
  const styles = MyMenuStyle();
  const [selected, setSelected] = useState('')

  const handleItemClick = (route) =>{
    props.onClick(route)
    setSelected(route)
  }
  const contacts = routes.contact.list;
  const home = routes.home.root;
  const record = routes.recorder.test;
  const story = routes.story.new;

  return (
    <div className={styles.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MyMenuItemLink
          to={contacts}
          onClick={() => handleItemClick(contacts)}
          icon={<Inbox />}
          text={menuTxt.contacts}
          selected = {selected === contacts ? true : false}
        />
        <MyMenuItemLink
          to={record}
          onClick={() => handleItemClick(record)}
          icon={<Voicemail />}
          text={menuTxt.recordings}
          selected = {selected ===  record ? true : false}
        />
        <MyMenuItemLink
          to={story}
          onClick={() => handleItemClick(story)}
          icon={<LocalLibrary />}
          text={menuTxt.stories}
          selected = {selected ===  story ? true : false}
        />
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem
          onClick={() => handleItemClick(home)}
          selected = {selected === home ? true : false}
          button>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  );
}
