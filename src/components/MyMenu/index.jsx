
import React, {useState} from 'react';
import {List,ListItem,ListItemText,Divider} from '@material-ui/core/';
import {Inbox,Drafts} from '@material-ui/icons/';
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
  const login = routes.login.login;
  const contacts = routes.contact.list;
  const home = routes.home.root;
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
          to={login}
          onClick={() => handleItemClick(login)}
          icon={<Drafts />}
          text="Drafts"
          selected = {selected === login ? true : false}
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
